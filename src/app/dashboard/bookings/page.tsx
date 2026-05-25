import Link from "next/link";
import { BedDouble, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";
import { BookingCard } from "@/components/booking-card";

export const dynamic = "force-dynamic";

const STATUS_GROUPS = [
  { key: "all",       label: "All stays",  icon: CalendarDays  },
  { key: "upcoming",  label: "Upcoming",   icon: Clock3        },
  { key: "completed", label: "Completed",  icon: CheckCircle2  },
  { key: "cancelled", label: "Cancelled",  icon: XCircle       },
] as const;

export default async function DashboardBookingsPage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  const now = new Date();
  const counts = {
    all:       bookings.length,
    upcoming:  bookings.filter((b) => b.status !== "cancelled" && new Date(b.checkOut) >= now).length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Guest history</p>
          <h1 className="mt-2 text-3xl font-bold text-[#111827] md:text-4xl">Your bookings</h1>
        </div>

        <Link
          href="/rooms"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
        >
          <BedDouble className="h-4 w-4" />
          Browse rooms
        </Link>
      </div>

      {/* ── Status summary chips ────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATUS_GROUPS.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="flex flex-col gap-1 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <Icon className="h-3.5 w-3.5" />
              <span className="text-xs">{label}</span>
            </div>
            <span className="text-2xl font-bold text-[#111827]">{counts[key]}</span>
          </div>
        ))}
      </div>

      {/* ── Booking list or empty state ─────────────────────── */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={String(booking._id)} booking={booking as never} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-16 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#22C7C7]/20 bg-[#22C7C7]/10">
            <BedDouble className="h-9 w-9 text-[#22C7C7]" />
          </div>
          <div className="max-w-sm space-y-2">
            <h2 className="text-xl font-semibold text-[#111827]">No trips booked yet</h2>
            <p className="text-sm text-[#6B7280]">
              Your stay history will appear here once you make a booking. Find your perfect room and start planning your next trip.
            </p>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
          >
            <BedDouble className="h-4 w-4" />
            Explore rooms
          </Link>
        </div>
      )}
    </div>
  );
}
