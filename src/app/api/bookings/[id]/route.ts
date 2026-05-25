import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    if (user.role !== "admin") {
      return apiError("Only admins can change booking status.", 403);
    }

    const { id } = await params;
    const body = (await request.json()) as { status?: string };

    if (!body.status) {
      return apiError("Booking status is required.", 422);
    }

    const booking = await Booking.findByIdAndUpdate(id, { status: body.status }, { new: true }).lean();

    if (!booking) {
      return apiError("Booking not found.", 404);
    }

    return apiSuccess(booking, "Booking updated successfully.");
  } catch {
    return apiError("Unable to update booking.", 500);
  }
}
