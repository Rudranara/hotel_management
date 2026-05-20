import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { diffInNights } from "@/utils/date";

export async function ensureRoomAvailable(roomId: string, checkIn: string, checkOut: string) {
  const conflictingBooking = await Booking.findOne({
    room: roomId,
    status: { $in: ["pending", "confirmed"] },
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  }).lean();

  return !conflictingBooking;
}

export async function buildBookingPrice(roomId: string, checkIn: string, checkOut: string) {
  const room = await Room.findById(roomId).lean();

  if (!room) {
    return null;
  }

  const nights = diffInNights(checkIn, checkOut);
  const totalPrice = nights * room.price;

  return {
    room,
    nights,
    totalPrice,
  };
}
