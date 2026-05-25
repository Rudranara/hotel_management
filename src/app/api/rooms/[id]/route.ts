import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { validateRoomInput } from "@/lib/validators";
import Room from "@/models/Room";
import { slugify } from "@/utils/format";

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
      return apiError("Only admins can update rooms.", 403);
    }

    const { id } = await params;

    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateRoomInput(body);

    if (!validated.isValid) {
      return apiError("Please review the room fields.", 422, validated.errors);
    }

    const roomPayload = {
      ...validated.data,
      availabilityStatus: validated.data.availabilityStatus as "available" | "limited" | "unavailable",
      slug: slugify(validated.data.name),
    };

    const room = await Room.findByIdAndUpdate(
      id,
      roomPayload,
      { new: true },
    ).lean();

    if (!room) {
      return apiError("Room not found.", 404);
    }

    return apiSuccess(room, "Room updated successfully.");
  } catch {
    return apiError("Unable to update room.", 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    if (user.role !== "admin") {
      return apiError("Only admins can delete rooms.", 403);
    }

    const { id } = await params;
    const room = await Room.findByIdAndDelete(id).lean();

    if (!room) {
      return apiError("Room not found.", 404);
    }

    return apiSuccess(room, "Room deleted successfully.");
  } catch {
    return apiError("Unable to delete room.", 500);
  }
}
