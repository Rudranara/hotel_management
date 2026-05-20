const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function diffInNights(checkIn: Date | string, checkOut: Date | string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / ONE_DAY_MS));
}

export function isDateRangeValid(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  return Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()) && end > start;
}
