import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import { env } from "@/lib/env";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  try {
    if (!env.stripeWebhookSecret || !env.stripeSecretKey) {
      return new NextResponse("Stripe not configured", { status: 503 });
    }

    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) return new NextResponse("Missing signature", { status: 400 });

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(env.stripeSecretKey as string, { apiVersion: "2026-04-22.dahlia" });

    let event: import("stripe").Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, env.stripeWebhookSecret as string);
    } catch {
      return new NextResponse("Webhook signature verification failed", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as import("stripe").Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await connectToDatabase();
        await Booking.findByIdAndUpdate(bookingId, { status: "confirmed" });
      }
    }

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error("[stripe-webhook]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Stripe requires raw body — disable body parsing
export const config = { api: { bodyParser: false } };
