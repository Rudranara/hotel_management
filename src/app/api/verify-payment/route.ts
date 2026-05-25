import crypto from "crypto";
import { NextResponse } from "next/server";

import { getApiUser } from "@/lib/dal";
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

    const booking = await Booking.findOne({ _id: bookingId, user: user._id });
    if (!booking) return apiError("Booking not found.", 404);

    booking.status = "confirmed";
    await booking.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[verify-payment]", err);
    return apiError("Payment verification failed.", 500);
  }
}
