export const AUTH_COOKIE = "huts4u_token";

export const ROOM_TYPES = ["Deluxe", "Suite", "Villa", "Cabin", "Family"] as const;

export const ROOM_AMENITIES = [
  "Ocean View",
  "Private Balcony",
  "Breakfast Included",
  "Wi-Fi",
  "Air Conditioning",
  "Workspace",
  "Mini Bar",
  "Airport Pickup",
] as const;

export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;
