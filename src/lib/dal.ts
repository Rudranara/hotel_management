import "server-only";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Review from "@/models/Review";
import Room from "@/models/Room";
import User from "@/models/User";

export async function getCurrentUser() {
  await connectToDatabase();
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  const user = await User.findById(session.userId).select("-password").lean();
  return user;
}

export async function getApiUser() {
  await connectToDatabase();
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  return User.findById(session.userId).select("-password").lean();
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return user;
}

export async function getRooms(filters?: { query?: string; type?: string; maxPrice?: number }) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (filters?.query) {
    query.$or = [
      { name: { $regex: filters.query, $options: "i" } },
      { location: { $regex: filters.query, $options: "i" } },
      { description: { $regex: filters.query, $options: "i" } },
    ];
  }

  if (filters?.type && filters.type !== "All") {
    query.type = filters.type;
  }

  if (filters?.maxPrice) {
    query.price = { $lte: filters.maxPrice };
  }

  const rooms = await Room.find(query).sort({ featured: -1, createdAt: -1 }).lean();

  // Compute live availability: "booked" only if a confirmed booking is active RIGHT NOW
  // (checkIn <= today < checkOut).  Future-only bookings leave the room "available".
  const today = new Date();
  const bookedRoomIds = await Booking.distinct("room", {
    status: "confirmed",
    checkIn:  { $lte: today },
    checkOut: { $gt:  today },
  });
  const bookedSet = new Set(bookedRoomIds.map(String));

  return rooms.map((room) => ({
    ...room,
    availabilityStatus: bookedSet.has(String(room._id)) ? "booked" : "available",
  }));
}

export async function getRoomBySlug(slug: string) {
  await connectToDatabase();
  const room = await Room.findOne({ slug }).lean();

  if (!room) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [reviews, upcomingBookings] = await Promise.all([
    Review.find({ room: room._id })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .lean(),
    Booking.find({
      room: room._id,
      status: "confirmed",
      checkOut: { $gt: today },
    })
      .select("checkIn checkOut")
      .sort({ checkIn: 1 })
      .lean(),
  ]);

  const bookedRanges = upcomingBookings.map((b) => ({
    from: (b.checkIn as Date).toISOString().split("T")[0] as string,
    to:   (b.checkOut as Date).toISOString().split("T")[0] as string,
  }));

  return {
    room: {
      ...room,
      // "booked" only when a confirmed booking covers today
    availabilityStatus:
      upcomingBookings.some((b) => new Date(b.checkIn as Date) <= today && new Date(b.checkOut as Date) > today)
        ? "booked"
        : "available",
    },
    reviews,
    bookedRanges,
  };
}

export async function getRoomBookedRanges(roomId: string): Promise<{ from: string; to: string }[]> {
  await connectToDatabase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookings = await Booking.find({
    room: roomId,
    status: "confirmed",
    checkOut: { $gt: today },
  })
    .select("checkIn checkOut")
    .sort({ checkIn: 1 })
    .lean();

  return bookings.map((b) => ({
    from: (b.checkIn as Date).toISOString().split("T")[0] as string,
    to:   (b.checkOut as Date).toISOString().split("T")[0] as string,
  }));
}

export async function getDashboardData(userId: string) {
  await connectToDatabase();

  const [bookings, reviews] = await Promise.all([
    Booking.find({ user: userId })
      .populate("room", "name type images location price")
      .sort({ createdAt: -1 })
      .lean(),
    Review.find({ user: userId }).populate("room", "name").sort({ createdAt: -1 }).lean(),
  ]);

  return { bookings, reviews };
}

export async function getAdminDashboardData() {
  await connectToDatabase();

  const [rooms, bookings, users] = await Promise.all([
    Room.find().sort({ createdAt: -1 }).lean(),
    Booking.find()
      .populate("room", "name type")
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean(),
    User.find().select("-password").sort({ createdAt: -1 }).lean(),
  ]);

  // Analytics: daily revenue for last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const revenueByDay = await Booking.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo }, status: { $in: ["confirmed", "completed"] } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$totalPrice" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Upcoming check-ins (next 7 days)
  const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const upcomingCheckIns = await Booking.find({
    checkIn: { $gte: new Date(), $lte: sevenDaysFromNow },
    status: { $in: ["confirmed", "pending"] },
  })
    .populate("room", "name type images")
    .populate("user", "name email")
    .sort({ checkIn: 1 })
    .limit(10)
    .lean();

  return { rooms, bookings, users, revenueByDay, upcomingCheckIns };
}

export async function getBookingById(id: string, userId?: string) {
  await connectToDatabase();

  const query: Record<string, unknown> = { _id: id };
  if (userId) query.user = userId;

  return Booking.findOne(query)
    .populate("room", "name type location images price")
    .populate("user", "name email")
    .lean();
}

export async function getUserReviewedRoomIds(userId: string) {
  await connectToDatabase();
  const reviews = await Review.find({ user: userId }).select("room").lean();
  return new Set(reviews.map((r) => String(r.room)));
}
