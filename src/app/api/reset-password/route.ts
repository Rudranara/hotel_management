import bcrypt from "bcryptjs";

import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { token, password } = (await request.json()) as {
      token?: string;
      password?: string;
    };

    if (!token || !password) {
      return apiError("Token and new password are required.", 422);
    }

    if (password.length < 8) {
      return apiError("Password must be at least 8 characters.", 422);
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return apiError("This reset link is invalid or has expired.", 400);
    }

    const hashed = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(user._id, {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return apiSuccess(null, "Password updated successfully. You can now sign in.");
  } catch {
    return apiError("Unable to reset password.", 500);
  }
}
