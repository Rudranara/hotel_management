export const AUTH_COOKIE = "huts4u_token";

export const LOCATIONS = [
  "Puri, Odisha",
  "Bhubaneswar, Odisha",
  "Konark, Odisha",
  "Chilika Lake, Odisha",
  "Gopalpur, Odisha",
] as const;

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

/**
 * Coupon definitions.
 * type: "percent" → discount = totalPrice * value / 100
 * type: "flat"    → discount = value (INR), min applies
 */
export const COUPONS: Record<
  string,
  { type: "percent" | "flat"; value: number; minOrder?: number; label: string }
> = {
  WELCOME10:  { type: "percent", value: 10, label: "10% off your booking" },
  HUTS4U20:   { type: "percent", value: 20, minOrder: 10000, label: "20% off (min ₹10,000)" },
  FLAT1500:   { type: "flat",    value: 1500, minOrder: 8000, label: "₹1,500 flat off (min ₹8,000)" },
  SUMMER25:   { type: "percent", value: 25, minOrder: 20000, label: "25% off (min ₹20,000)" },
  FIRSTTRIP:  { type: "flat",    value: 2000, minOrder: 5000, label: "₹2,000 off first booking" },
};
