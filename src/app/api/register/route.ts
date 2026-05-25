import bcrypt from "bcryptjs";

import { setSessionCookie } from "@/lib/auth";
import { env, isDatabaseConfigured } from "@/lib/env";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { validateRegisterInput } from "@/lib/validators";
import User from "@/models/User";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return apiError(
      "Database not configured. Create a .env.local file with MONGODB_URI to enable accounts.",
      503,
    );
  }

  try {
    await connectToDatabase();

    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateRegisterInput(body);

    if (!validated.isValid) {
      return apiError("Please fix the highlighted fields.", 422, validated.errors);
    }

    const existingUser = await User.findOne({ email: validated.data.email }).lean();
    if (existingUser) {
      return apiError("An account already exists for this email.", 409);
    }

    const hashedPassword = await bcrypt.hash(validated.data.password, 12);
    const role = validated.data.email === env.adminEmail ? "admin" : "guest";

    const user = await User.create({
      ...validated.data,
      role,
      password: hashedPassword,
    });

    await setSessionCookie({
      userId: String(user._id),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return apiSuccess({ role: user.role }, "Account created successfully.", 201);
  } catch (err) {
    const message = process.env.NODE_ENV === "development"
      ? String(err)
      : "Unable to create account right now.";
    return apiError(message, 500);
  }
}
