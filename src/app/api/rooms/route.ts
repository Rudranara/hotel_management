import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { validateRoomInput } from "@/lib/validators";
import Room from "@/models/Room";
import { slugify } from "@/utils/format";

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const maxPrice = searchParams.get("maxPrice");

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

  const rooms = await Room.find(filters).sort({ featured: -1, createdAt: -1 }).lean();
  return apiSuccess(rooms);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const user = await getApiUser();

  if (!user) {
    return apiError("Authentication required.", 401);
  }

  if (user.role !== "admin") {
    return apiError("Only admins can create rooms.", 403);
  }

  try {
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
