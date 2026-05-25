import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Review from "@/models/Review";
import Room from "@/models/Room";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    const body = (await request.json()) as { roomId?: string; bookingId?: string; rating?: number; comment?: string };

    if (!body.roomId || !body.bookingId || !body.rating || !body.comment?.trim()) {
      return apiError("Room, booking, rating, and comment are all required.", 422);
    }

    if (body.rating < 1 || body.rating > 5) {
      return apiError("Rating must be between 1 and 5.", 422);
    }

    // Verify the booking belongs to this user and is completed
    const booking = await Booking.findOne({
      _id: body.bookingId,
      user: user._id,
      room: body.roomId,
      status: "completed",
    }).lean();

    if (!booking) {
      return apiError("You can only review rooms from completed stays.", 403);
    }

    // One review per room per user
    const existing = await Review.findOne({ user: user._id, room: body.roomId }).lean();
    if (existing) {
      return apiError("You have already reviewed this room.", 409);
    }

    const review = await Review.create({
      user: user._id,
      room: body.roomId,
      rating: body.rating,
      comment: body.comment.trim(),
    });

    // Update room's average rating
    const allReviews = await Review.find({ room: body.roomId }).lean();
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Room.findByIdAndUpdate(body.roomId, {
      rating: Math.round(avg * 10) / 10,
      reviewCount: allReviews.length,
    });

    return apiSuccess(review, "Review submitted successfully.", 201);
  } catch {
    return apiError("Unable to submit review.", 500);
  }
}
