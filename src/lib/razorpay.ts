import "server-only";

import Razorpay from "razorpay";

import { env } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export function getRazorpayInstance(): Razorpay {
  return new Razorpay({
    key_id: env.razorpayKeyId,
    key_secret: env.razorpayKeySecret,
  });
}

/**
 * Lazily creates a Razorpay Customer for the given user and stores the ID on
 * the User document. If the user already has a customer ID it is returned
 * immediately (no extra API call). Returns null if creation fails.
 */
export async function getOrCreateRazorpayCustomer(
  userId: string,
  userData: { name: string; email: string; phone?: string; existingCustomerId?: string },
): Promise<string | null> {
  if (userData.existingCustomerId) return userData.existingCustomerId;

  try {
    await connectToDatabase();

    const user = await User.findById(userId)
      .select("razorpayCustomerId")
      .lean() as { razorpayCustomerId?: string } | null;

    if (user?.razorpayCustomerId) return user.razorpayCustomerId;

    const rzp = getRazorpayInstance();

    let customerId: string | null = null;

    try {
      const customer = await rzp.customers.create({
        name: userData.name,
        email: userData.email,
        contact: userData.phone ?? "",
        fail_existing: 0,
      });
      customerId = customer.id;
    } catch (createErr) {
      // Razorpay may still throw 400 "Customer already exists" even with fail_existing:0
      const rzErr = createErr as { statusCode?: number; error?: { description?: string } };
      const isAlreadyExists =
        rzErr.statusCode === 400 &&
        rzErr.error?.description?.toLowerCase().includes("customer already exists");

      if (!isAlreadyExists) throw createErr;

      // Recover: scan customer list for matching email
      const list = await rzp.customers.all({ count: 100 });
      const match = (list.items as Array<{ id: string; email?: string }>)
        .find((c) => c.email?.toLowerCase() === userData.email.toLowerCase());
      customerId = match?.id ?? null;
    }

    if (customerId) {
      await User.findByIdAndUpdate(userId, { razorpayCustomerId: customerId });
    }
    return customerId;
  } catch (err) {
    const rzErr = err as { statusCode?: number; error?: { description?: string; code?: string } };
    console.error(
      "[razorpay] getOrCreateCustomer: status=%s code=%s desc=%s",
      rzErr.statusCode ?? "?",
      rzErr.error?.code ?? "?",
      rzErr.error?.description ?? (err instanceof Error ? err.message : String(err)),
    );
    return null;
  }
}