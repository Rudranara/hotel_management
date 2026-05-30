import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Room from "@/models/Room";
import { isValidObjectId } from "mongoose";

/** GET /api/wishlist — return user's saved rooms (full objects) */
export async function GET() {
  try {
    const user = await getApiUser();
    if (!user) return apiError("Authentication required.", 401);

    await connectToDatabase();
    const fresh = await User.findById(user._id).select("wishlist").lean();
    if (!fresh) return apiError("User not found.", 404);

    const rooms = await Room.find({ _id: { $in: fresh.wishlist } })
      .select("_id name slug type location price images rating capacity amenities availabilityStatus")
      .lean();

    return apiSuccess(rooms);
  } catch {
    return apiError("Unable to fetch wishlist.", 500);
  }
}

/** POST /api/wishlist — toggle a room in/out of wishlist, returns { saved: boolean } */
export async function POST(request: Request) {
  try {
    const user = await getApiUser();
    if (!user) return apiError("Authentication required.", 401);

    const { roomId } = (await request.json()) as { roomId?: string };
    if (!roomId || !isValidObjectId(roomId)) return apiError("Invalid roomId.", 400);

    await connectToDatabase();
    const fresh = await User.findById(user._id).select("wishlist").lean();
    if (!fresh) return apiError("User not found.", 404);

    const already = (fresh.wishlist ?? []).map(String).includes(roomId);

    if (already) {
      await User.findByIdAndUpdate(user._id, { $pull: { wishlist: roomId } });
    } else {
      await User.findByIdAndUpdate(user._id, { $addToSet: { wishlist: roomId } });
    }

    return apiSuccess({ saved: !already }, already ? "Removed from wishlist." : "Saved to wishlist.");
  } catch {
    return apiError("Unable to update wishlist.", 500);
  }
}
