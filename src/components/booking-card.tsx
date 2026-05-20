import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/format";

interface BookingCardProps {
  booking: {
    bookingNumber: string;
    status: string;
    checkIn: string | Date;
    checkOut: string | Date;
    totalPrice: number;
    room?: {
      name?: string;
      type?: string;
      location?: string;
    };
  };
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <article className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Booking Ref</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{booking.bookingNumber}</h3>
          <p className="mt-2 text-white/70">{booking.room?.name ?? "Room unavailable"}</p>
          <p className="text-sm text-white/50">{booking.room?.type ?? "Stay"} </p>
        </div>
        <div className="grid gap-3 text-sm text-white/75 md:text-right">
          <p>{formatDate(booking.checkIn)} to {formatDate(booking.checkOut)}</p>
          <p>{formatCurrency(booking.totalPrice)}</p>
          <p className="capitalize text-amber-200">{booking.status}</p>
        </div>
      </div>
    </article>
  );
}
