import Image from "next/image";
import { BedDouble, CalendarDays, MapPin, Users } from "lucide-react";

import { formatDate, diffInNights } from "@/utils/date";
import { formatCurrency } from "@/utils/format";

interface BookingCardProps {
  booking: {
    bookingNumber: string;
    status: string;
    checkIn: string | Date;
    checkOut: string | Date;
    guests: number;
    totalPrice: number;
    room?: {
      name?: string;
      type?: string;
      location?: string;
      images?: string[];
    };
  };
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
  completed: "bg-sky-50 text-sky-700 border border-sky-200",
};

export function BookingCard({ booking }: BookingCardProps) {
  const nights = diffInNights(booking.checkIn, booking.checkOut);
  const image = booking.room?.images?.[0];

  return (
    <article className="flex overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition hover:border-[#22C7C7]/30 hover:shadow-sm">
      {/* Thumbnail */}
      {image && (
        <div className="relative hidden w-32 shrink-0 sm:block">
          <Image src={image} alt={booking.room?.name ?? "Room"} fill className="object-cover" sizes="128px" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/30" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: room info */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[booking.status] ?? STATUS_STYLES.pending}`}>
              {booking.status}
            </span>
            {booking.room?.type && (
              <span className="rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-0.5 text-xs text-[#6B7280]">
                {booking.room.type}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-[#111827]">{booking.room?.name ?? "Reserved room"}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#9CA3AF]">
            {booking.room?.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#22C7C7]" />
                {booking.room.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Right: dates, price, ref */}
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="text-xs text-[#D1D5DB]">Ref: <span className="font-mono text-[#9CA3AF]">{booking.bookingNumber}</span></p>
          <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm">
            <CalendarDays className="h-4 w-4 text-[#22C7C7]" />
            <span className="text-[#6B7280]">{formatDate(booking.checkIn)}</span>
            <span className="text-[#D1D5DB]">→</span>
            <span className="text-[#6B7280]">{formatDate(booking.checkOut)}</span>
            <span className="ml-1 rounded-full bg-[#22C7C7]/10 px-2 py-0.5 text-xs font-medium text-[#22C7C7]">
              {nights}n
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-[#D1D5DB]" />
            <span className="text-base font-bold text-[#111827]">{formatCurrency(booking.totalPrice)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

