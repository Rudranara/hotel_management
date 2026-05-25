import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    if (user.role === "admin") {
      const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
      return apiSuccess(users);
    }

    const currentUser = await User.findById(user._id).select("-password").lean();
    return apiSuccess(currentUser);
  } catch {
    return apiError("Unable to fetch users.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    if (user.role !== "admin") {
      return apiError("Only admins can update user roles.", 403);
    }

    const body = (await request.json()) as { id?: string; role?: string };

    if (!body.id || !body.role) {
      return apiError("User id and role are required.", 422);
    }

    const updatedUser = await User.findByIdAndUpdate(
      body.id,
      { role: body.role },
      { new: true },
    )
      .select("-password")
      .lean();

    if (!updatedUser) {
      return apiError("User not found.", 404);
    }

    return apiSuccess(updatedUser, "User role updated.");
  } catch {
    return apiError("Unable to update user.", 500);
  }
}
