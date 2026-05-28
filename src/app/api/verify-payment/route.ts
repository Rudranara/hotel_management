import crypto from "crypto";
import { NextResponse } from "next/server";

import { getApiUser } from "@/lib/dal";
import { sendPaymentConfirmedEmail } from "@/lib/email";
import { apiError } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { env } from "@/lib/env";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  try {
    const user = await getApiUser();
    if (!user) return apiError("Authentication required.", 401);

    const { bookingId, razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      (await request.json()) as {
        bookingId: string;
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      };

    if (!bookingId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return apiError("Missing payment details.", 400);
    }

    // Verify HMAC-SHA256 signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", env.razorpayKeySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return apiError("Invalid payment signature.", 400);
    }

    await connectToDatabase();

    const booking = await Booking.findOne({ _id: bookingId, user: user._id })
      .populate("room", "name")
      .populate("user", "name email");
    if (!booking) return apiError("Booking not found.", 404);

    booking.status = "confirmed";
    booking.razorpayPaymentId = razorpay_payment_id;
    await booking.save();

    // Fire-and-forget payment confirmation email
    const bookingUser = booking.user as { name?: string; email?: string } | null;
    const bookingRoom = booking.room as { name?: string } | null;
    if (bookingUser?.email) {
      const nights = Math.round(
        (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86_400_000,
      );
      void sendPaymentConfirmedEmail({
        guestName: bookingUser.name ?? "Guest",
        guestEmail: bookingUser.email,
        bookingNumber: booking.bookingNumber,
        roomName: bookingRoom?.name ?? "Room",
        checkIn: new Date(booking.checkIn).toLocaleDateString("en-IN", { dateStyle: "medium" }),
        checkOut: new Date(booking.checkOut).toLocaleDateString("en-IN", { dateStyle: "medium" }),
        nights,
        totalPrice: booking.totalPrice,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[verify-payment]", err);
    return apiError("Payment verification failed.", 500);
  }
}
