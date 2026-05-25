import bcrypt from "bcryptjs";

import { setSessionCookie } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/http";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongodb";
import { rateLimit } from "@/lib/rate-limit";
import { validateLoginInput } from "@/lib/validators";
import User from "@/models/User";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  if (!rateLimit(`login:${ip}`, 10, 60_000)) {
    return apiError("Too many login attempts. Please wait a minute and try again.", 429);
  }

  if (!isDatabaseConfigured()) {
    return apiError(
      "Database not configured. Create a .env.local file with MONGODB_URI to enable login.",
      503,
    );
  }

  try {
    await connectToDatabase();

    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateLoginInput(body);

    if (!validated.isValid) {
      return apiError("Invalid login details.", 422, validated.errors);
    }

    const user = await User.findOne({ email: validated.data.email });
    if (!user) {
      return apiError("Invalid email or password.", 401);
    }

    const passwordMatch = await bcrypt.compare(validated.data.password, user.password);
    if (!passwordMatch) {
      return apiError("Invalid email or password.", 401);
    }

    await setSessionCookie({
      userId: String(user._id),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return apiSuccess({ role: user.role }, "Logged in successfully.");
  } catch {
    return apiError("Unable to log in right now.", 500);
  }
}
