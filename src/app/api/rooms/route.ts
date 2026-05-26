import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { validateRoomInput } from "@/lib/validators";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { slugify } from "@/utils/format";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query");
    const type = searchParams.get("type");
    const maxPrice = searchParams.get("maxPrice");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    const filters: Record<string, unknown> = {};

    if (query) {
      filters.$or = [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ];
    }

    if (type && type !== "All") {
      filters.type = type;
    }

    if (maxPrice) {
      filters.price = { $lte: Number(maxPrice) };
    }

    // Exclude rooms with overlapping confirmed/active bookings
    if (checkIn && checkOut) {
      const ci = new Date(checkIn);
      const co = new Date(checkOut);
      if (!isNaN(ci.getTime()) && !isNaN(co.getTime()) && ci < co) {
        const conflicting = await Booking.find({
          status: { $in: ["pending", "confirmed"] },
          checkIn: { $lt: co },
          checkOut: { $gt: ci },
        })
          .select("room")
          .lean();
        const bookedRoomIds = conflicting.map((b) => b.room);
        if (bookedRoomIds.length > 0) {
          filters._id = { $nin: bookedRoomIds };
        }
      }
    }

    const rooms = await Room.find(filters).sort({ featured: -1, createdAt: -1 }).lean();
    return apiSuccess(rooms);
  } catch {
    return apiError("Unable to fetch rooms.", 500);
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    if (user.role !== "admin") {
      return apiError("Only admins can create rooms.", 403);
    }

    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateRoomInput(body);

    if (!validated.isValid) {
      return apiError("Please review the room fields.", 422, validated.errors);
    }

    const slugBase = slugify(validated.data.name);
    const existing = await Room.countDocuments({ slug: { $regex: `^${slugBase}` } });
    const slug = existing > 0 ? `${slugBase}-${existing + 1}` : slugBase;

    const roomPayload = {
      ...validated.data,
      availabilityStatus: validated.data.availabilityStatus as "available" | "limited" | "unavailable",
      slug,
    };

    const room = await Room.create({
      ...roomPayload,
    });

    return apiSuccess(room, "Room created successfully.", 201);
  } catch {
    return apiError("Unable to create room.", 500);
  }
}
