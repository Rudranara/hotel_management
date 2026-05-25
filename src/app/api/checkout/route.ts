import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import { getApiUser } from "@/lib/dal";
import { apiError } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { env, isRazorpayConfigured } from "@/lib/env";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  try {
    if (!isRazorpayConfigured()) {
      return apiError("Payment is not configured.", 503);
    }

    const user = await getApiUser();
    if (!user) return apiError("Authentication required.", 401);

    await connectToDatabase();

    const { bookingId } = (await request.json()) as { bookingId: string };
    if (!bookingId) return apiError("bookingId is required.", 400);

    const booking = await Booking.findOne({ _id: bookingId, user: user._id })
      .populate("room", "name bookingNumber")
      .lean();

    if (!booking) return apiError("Booking not found.", 404);

    const b = booking as {
      _id: unknown;
      totalPrice: number;
      bookingNumber: string;
      room: { name?: string };
    };

    const razorpay = new Razorpay({
      key_id: env.razorpayKeyId,
      key_secret: env.razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(b.totalPrice * 100), // paise
      currency: "INR",
      receipt: `bkg_${b.bookingNumber}`,
      notes: { bookingId: String(b._id) },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.razorpayKeyId,
    });
  } catch (err) {
    console.error("[checkout]", err);
    return apiError("Unable to create checkout session.", 500);
  }
}

