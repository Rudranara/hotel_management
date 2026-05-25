import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { validateProfileInput } from "@/lib/validators";
import User from "@/models/User";

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateProfileInput(body);

    if (!validated.isValid) {
      return apiError("Please check the profile form.", 422, validated.errors);
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, validated.data, {
      new: true,
    })
      .select("-password")
      .lean();

    return apiSuccess(updatedUser, "Profile updated successfully.");
  } catch {
    return apiError("Unable to update profile.", 500);
  }
}
