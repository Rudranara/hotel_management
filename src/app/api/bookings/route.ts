import { buildBookingPrice, ensureRoomAvailable } from "@/lib/booking";
import { getApiUser } from "@/lib/dal";
import { apiError, apiSuccess } from "@/lib/http";
import { connectToDatabase } from "@/lib/mongodb";
import { validateBookingInput } from "@/lib/validators";
import Booking from "@/models/Booking";

function createBookingNumber() {
  return `HTS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function GET() {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    const query = user.role === "admin" ? {} : { user: user._id };
    const bookings = await Booking.find(query)
      .populate("room", "name type images location price")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return apiSuccess(bookings);
  } catch {
    return apiError("Unable to fetch bookings.", 500);
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const user = await getApiUser();

    if (!user) {
      return apiError("Authentication required.", 401);
    }

    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateBookingInput(body);

    if (!validated.isValid) {
      return apiError("Please check your booking details.", 422, validated.errors);
    }

    const available = await ensureRoomAvailable(
      validated.data.room,
      validated.data.checkIn,
      validated.data.checkOut,
    );

    if (!available) {
      return apiError("This room is already booked for the selected dates.", 409);
    }

    const pricing = await buildBookingPrice(
      validated.data.room,
      validated.data.checkIn,
      validated.data.checkOut,
    );

    if (!pricing) {
      return apiError("Room not found.", 404);
    }

    const booking = await Booking.create({
      user: user._id,
      room: validated.data.room,
      bookingNumber: createBookingNumber(),
      checkIn: new Date(validated.data.checkIn),
      checkOut: new Date(validated.data.checkOut),
      guests: validated.data.guests,
      totalPrice: pricing.totalPrice,
      specialRequests: validated.data.specialRequests,
      status: "pending",
    });

    return apiSuccess(
      { bookingNumber: booking.bookingNumber, totalPrice: booking.totalPrice },
      "Booking created successfully.",
      201,
    );
  } catch {
    return apiError("Unable to create booking.", 500);
  }
}
