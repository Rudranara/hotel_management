import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import { getApiUser } from "@/lib/dal";
import { apiError } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { env, isRazorpayConfigured } from "@/lib/env";
import { getOrCreateRazorpayCustomer } from "@/lib/razorpay";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  try {
    if (!isRazorpayConfigured()) {
      return apiError("Payment is not configured.", 503);
    }

    const user = await getApiUser();
    if (!user) return apiError("Authentication required.", 401);

    await connectToDatabase();

    // Lazily create a Razorpay Customer so saved cards are linked
    const razorpayUser = user as typeof user & { razorpayCustomerId?: string };
    const customerId = await getOrCreateRazorpayCustomer(String(user._id), {
      name: user.name,
      email: user.email,
      phone: user.phone ?? undefined,
      existingCustomerId: razorpayUser.razorpayCustomerId ?? undefined,
    });

    const { bookingId, finalAmount } = (await request.json()) as {
      bookingId: string;
      finalAmount?: number;
    };
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

    // Use discounted amount if provided (coupon applied), else fall back to booking price
    const chargeAmount = typeof finalAmount === "number" && finalAmount > 0
      ? finalAmount
      : b.totalPrice;

    const order = await razorpay.orders.create({
      amount: Math.round(chargeAmount * 100), // paise
      currency: "INR",
      receipt: `bkg_${b.bookingNumber}`,
      notes: { bookingId: String(b._id) },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.razorpayKeyId,
      customerId: customerId ?? undefined,
    });
  } catch (err) {
    console.error("[checkout]", err);
    return apiError("Unable to create checkout session.", 500);
  }
}

