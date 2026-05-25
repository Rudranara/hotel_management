import { getApiUser } from "@/lib/dal";
import { sendBookingCancelledEmail } from "@/lib/email";
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

    const { id } = await params;
    const body = (await request.json()) as { status?: string };

    if (!body.status) {
      return apiError("Booking status is required.", 422);
    }

    const booking = await Booking.findById(id).lean();

    if (!booking) {
      return apiError("Booking not found.", 404);
    }

    // Guests may only cancel their own pending/confirmed bookings
    if (user.role !== "admin") {
      if (String(booking.user) !== String(user._id)) {
        return apiError("Access denied.", 403);
      }
      if (body.status !== "cancelled") {
        return apiError("Guests may only cancel bookings.", 403);
      }
      if (booking.status === "completed" || booking.status === "cancelled") {
        return apiError("This booking cannot be cancelled.", 422);
      }
    }

    const updated = await Booking.findByIdAndUpdate(id, { status: body.status }, { new: true })
      .populate("room", "name")
      .populate("user", "name email")
      .lean();

    // Send cancellation email when status becomes "cancelled"
    if (body.status === "cancelled" && updated) {
      const bookingUser = updated.user as { name?: string; email?: string } | null;
      const bookingRoom = updated.room as { name?: string } | null;
      if (bookingUser?.email) {
        void sendBookingCancelledEmail({
          guestName: bookingUser.name ?? "Guest",
          guestEmail: bookingUser.email,
          bookingNumber: updated.bookingNumber,
          roomName: bookingRoom?.name ?? "Room",
        });
      }
    }

    return apiSuccess(updated, "Booking updated successfully.");
  } catch {
    return apiError("Unable to update booking.", 500);
  }
}
