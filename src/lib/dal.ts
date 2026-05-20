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

  return Room.find(query).sort({ featured: -1, createdAt: -1 }).lean();
}

export async function getRoomBySlug(slug: string) {
  await connectToDatabase();
  const room = await Room.findOne({ slug }).lean();

  if (!room) {
    return null;
  }

  const reviews = await Review.find({ room: room._id })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 })
    .lean();

  return { room, reviews };
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

  return { rooms, bookings, users };
}
