import Image from "next/image";
import { CalendarDays, MapPin, Users } from "lucide-react";

import { formatDate, diffInNights } from "@/utils/date";
import { formatCurrency } from "@/utils/format";

export interface BookingCardData {
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
  } | null;
}

interface BookingCardProps {
  booking: BookingCardData;
}

const STATUS_CONFIG: Record<string, { badge: string; dot: string; border: string }> = {
  confirmed: { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500", border: "border-l-emerald-400" },
  pending:   { badge: "bg-amber-50 text-amber-700 border border-amber-200",       dot: "bg-amber-400",   border: "border-l-amber-400"   },
  cancelled: { badge: "bg-red-50 text-red-600 border border-red-200",             dot: "bg-red-400",     border: "border-l-red-400"     },
  completed: { badge: "bg-sky-50 text-sky-700 border border-sky-200",             dot: "bg-sky-500",     border: "border-l-sky-400"     },
};

export function BookingCard({ booking }: BookingCardProps) {
  const nights = diffInNights(booking.checkIn, booking.checkOut);
  const image = booking.room?.images?.[0];
  const cfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;

  return (
    <article className={`group flex overflow-hidden rounded-2xl border border-[#E5E7EB] border-l-4 ${cfg.border} bg-white shadow-sm transition hover:shadow-md`}>
      {/* Thumbnail */}
      {image ? (
        <div className="relative w-24 shrink-0 sm:w-36 lg:w-44">
          <Image
            src={image}
            alt={booking.room?.name ?? "Room"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 176px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>
      ) : (
        <div className="w-24 shrink-0 bg-gradient-to-br from-[#22C7C7]/10 to-[#22C7C7]/5 sm:w-36 lg:w-44" />
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        {/* Status + ref */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${cfg.badge}`}>
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
              {booking.status}
            </span>
            {booking.room?.type && (
              <span className="rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-0.5 text-xs font-medium capitalize text-[#6B7280]">
                {booking.room.type}
              </span>
            )}
          </div>
          <span className="shrink-0 font-mono text-[10px] tracking-wide text-[#C5CBD3]">
            {booking.bookingNumber}
          </span>
        </div>

        {/* Room name + meta */}
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold leading-snug text-[#111827]">
            {booking.room?.name ?? "Reserved room"}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#9CA3AF]">
            {booking.room?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0 text-[#22C7C7]" />
                {booking.room.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3 shrink-0" />
              {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Dates + price */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-1.5 text-xs text-[#6B7280]">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#22C7C7]" />
            <span className="font-medium text-[#374151]">{formatDate(booking.checkIn)}</span>
            <span className="text-[#D1D5DB]">→</span>
            <span className="font-medium text-[#374151]">{formatDate(booking.checkOut)}</span>
            <span className="ml-1 rounded-full bg-[#22C7C7]/10 px-1.5 py-0.5 font-semibold text-[#22C7C7]">
              {nights}n
            </span>
          </div>
          <span className="text-base font-bold text-[#111827]">{formatCurrency(booking.totalPrice)}</span>
        </div>
      </div>
    </article>
  );
}

