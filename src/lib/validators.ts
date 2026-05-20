import { isDateRangeValid } from "@/utils/date";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateRegisterInput(input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim().toLowerCase();
  const password = String(input.password ?? "");

  if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!isEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { name, email, password },
  };
}

export function validateLoginInput(input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const email = String(input.email ?? "").trim().toLowerCase();
  const password = String(input.password ?? "");

  if (!isEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { email, password },
  };
}

export function validateRoomInput(input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const name = String(input.name ?? "").trim();
  const type = String(input.type ?? "").trim();
  const description = String(input.description ?? "").trim();
  const location = String(input.location ?? "").trim();
  const price = Number(input.price ?? 0);
  const capacity = Number(input.capacity ?? 1);
  const availabilityStatus = String(input.availabilityStatus ?? "available");
  const images = Array.isArray(input.images)
    ? input.images.map((item) => String(item).trim()).filter(Boolean)
    : [];
  const amenities = Array.isArray(input.amenities)
    ? input.amenities.map((item) => String(item).trim()).filter(Boolean)
    : [];

  if (name.length < 3) {
    errors.name = "Room name must be at least 3 characters.";
  }

  if (!type) {
    errors.type = "Room type is required.";
  }

  if (description.length < 24) {
    errors.description = "Description should be at least 24 characters.";
  }

  if (!location) {
    errors.location = "Location is required.";
  }

  if (price <= 0) {
    errors.price = "Price must be greater than zero.";
  }

  if (capacity <= 0) {
    errors.capacity = "Capacity must be at least 1.";
  }

  if (images.length === 0) {
    errors.images = "Add at least one room image URL.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      type,
      description,
      location,
      price,
      capacity,
      images,
      amenities,
      availabilityStatus:
        availabilityStatus === "limited" || availabilityStatus === "unavailable"
          ? availabilityStatus
          : "available",
      featured: Boolean(input.featured),
    },
  };
}

export function validateBookingInput(input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const room = String(input.room ?? "");
  const checkIn = String(input.checkIn ?? "");
  const checkOut = String(input.checkOut ?? "");
  const guests = Number(input.guests ?? 1);
  const specialRequests = String(input.specialRequests ?? "").trim();

  if (!room) {
    errors.room = "Room is required.";
  }

  if (!isDateRangeValid(checkIn, checkOut)) {
    errors.dates = "Choose a valid check-in and check-out range.";
  }

  if (guests <= 0) {
    errors.guests = "Guests must be at least 1.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { room, checkIn, checkOut, guests, specialRequests },
  };
}

export function validateProfileInput(input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const name = String(input.name ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const avatar = String(input.avatar ?? "").trim();
  const address = String(input.address ?? "").trim();

  if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { name, phone, avatar, address },
  };
}
