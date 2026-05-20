export type UserRole = "guest" | "admin";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type RoomAvailabilityStatus = "available" | "limited" | "unavailable";

export interface SessionUser {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export interface RoomFilters {
  query?: string;
  type?: string;
  maxPrice?: number;
}
