import crypto from "crypto";

import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import { env } from "@/lib/env";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { email } = (await request.json()) as { email?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return apiError("Please enter a valid email address.", 422);
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Always return success to prevent user enumeration
    if (!user) {
      return apiSuccess(null, "If that email is registered, a reset link has been sent.");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });

    const resetUrl = `${env.appUrl}/reset-password?token=${token}`;

    void sendPasswordResetEmail(user.email, user.name, resetUrl);

    return apiSuccess(null, "If that email is registered, a reset link has been sent.");
  } catch {
    return apiError("Unable to process request.", 500);
  }
}
