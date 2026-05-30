import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  BedDouble,
  MapPin,
  CalendarDays,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Moon,
  Receipt,
} from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";
import { formatDate, diffInNights } from "@/utils/date";
import { formatCurrency } from "@/utils/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Saved Trips | Huts4u",
  description: "Your upcoming and completed hotel stays.",
};

// ── Types ────────────────────────────────────────────────────────────────────

type Trip = {
  _id: string;
  bookingNumber: string;
  status: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  room: {
    name?: string;
    type?: string;
    location?: string;
    images?: string[];
  } | null;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  confirmed: { label: "Confirmed",  color: "text-emerald-700", bg: "bg-emerald-50",  dot: "bg-emerald-500"  },
  pending:   { label: "Pending",    color: "text-amber-700",   bg: "bg-amber-50",    dot: "bg-amber-400"    },
  completed: { label: "Completed",  color: "text-[#6B7280]",   bg: "bg-[#F1F5F9]",  dot: "bg-[#9CA3AF]"   },
};

function TripCard({ trip }: { trip: Trip }) {
  const nights = diffInNights(trip.checkIn, trip.checkOut);
  const image  = trip.room?.images?.[0];
  const cfg    = STATUS_CONFIG[trip.status] ?? STATUS_CONFIG.confirmed;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition hover:border-[#22C7C7]/40 hover:shadow-md">
      {/* Image strip */}
      <div className="relative h-44 overflow-hidden bg-[#F1F5F9]">
        {image ? (
          <Image
            src={image}
            alt={trip.room?.name ?? "Room"}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:640px)100vw,50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BedDouble className="h-10 w-10 text-[#D1D5DB]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Type badge */}
        {trip.room?.type && (
          <span className="absolute left-3 top-3 rounded-full bg-[#0057D9] px-2.5 py-0.5 text-[10px] font-bold text-white">
            {trip.room.type}
          </span>
        )}

        {/* Status badge */}
        <span
          className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${cfg.bg} ${cfg.color}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>

        {/* Nights pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Moon className="h-3 w-3" /> {nights} night{nights !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-[#111827] transition group-hover:text-[#22C7C7]">
              {trip.room?.name ?? "Unknown room"}
            </h3>
            {trip.room?.location && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B7280]">
                <MapPin className="h-3 w-3 shrink-0 text-[#22C7C7]" /> {trip.room.location}
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="font-extrabold text-[#111827]">{formatCurrency(trip.totalPrice)}</p>
            <p className="text-[11px] text-[#9CA3AF]">total paid</p>
          </div>
        </div>

        {/* Date row */}
        <div className="mt-3 flex items-center gap-3 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-[#22C7C7]" />
            {formatDate(trip.checkIn)}
          </span>
          <ArrowRight className="h-3 w-3 shrink-0 text-[#D1D5DB]" />
          <span>{formatDate(trip.checkOut)}</span>
        </div>

        {/* Meta row */}
        <div className="mt-2 flex items-center gap-4 text-[11px] text-[#9CA3AF]">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {trip.guests} guest{trip.guests !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Receipt className="h-3 w-3" /> {trip.bookingNumber}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
          {trip.status === "completed" && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> Stay completed
            </span>
          )}
          {(trip.status === "confirmed" || trip.status === "pending") && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-[#22C7C7]">
              <Clock className="h-3.5 w-3.5" /> Upcoming stay
            </span>
          )}
          <Link
            href="/dashboard/bookings"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
          >
            Manage <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function SavedTripsPage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  // Serialize dates (lean docs have Date objects)
  const all = JSON.parse(JSON.stringify(bookings)) as Trip[];

  const now = new Date().toISOString();

  // Upcoming = confirmed/pending where checkout is in the future
  const upcoming = all.filter(
    (b) => (b.status === "confirmed" || b.status === "pending") && b.checkOut >= now,
  );

  // Past = completed OR any non-cancelled booking where checkout has passed
  const past = all.filter(
    (b) => b.status === "completed" || (b.status !== "cancelled" && b.checkOut < now),
  );

  const totalNights = past
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + diffInNights(b.checkIn, b.checkOut), 0);

  const isEmpty = upcoming.length === 0 && past.length === 0;

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Your travel history</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Saved trips</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {isEmpty
              ? "No trips yet"
              : `${upcoming.length} upcoming · ${past.length} past`}
          </p>
        </div>
        <Link
          href="/rooms"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-auto"
        >
          <BedDouble className="h-4 w-4" />
          Book a room
        </Link>
      </div>

      {isEmpty ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-8 py-20 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F1F5F9]">
            <Plane className="h-7 w-7 text-[#9CA3AF]" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-[#111827]">No trips yet</h2>
          <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
            Once you make a booking, your upcoming and completed stays will appear here.
          </p>
          <Link
            href="/rooms"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
          >
            <BedDouble className="h-4 w-4" /> Browse rooms
          </Link>
        </div>
      ) : (
        <>
          {/* ── Stats strip ── */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Plane,        label: "Upcoming stays",  value: upcoming.length, sub: "confirmed & pending"      },
              { icon: CheckCircle2, label: "Past trips",      value: past.length,     sub: "completed stays"          },
              { icon: Moon,         label: "Nights stayed",   value: totalNights,     sub: "across completed trips"   },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                  <Icon className="h-5 w-5 text-[#22C7C7]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#111827]">{value}</p>
                  <p className="text-xs font-semibold text-[#6B7280]">{label}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Upcoming stays ── */}
          {upcoming.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C7C7]/10">
                  <Plane className="h-4 w-4 text-[#22C7C7]" />
                </div>
                <h2 className="font-bold text-[#111827]">Upcoming stays</h2>
                <span className="rounded-full bg-[#22C7C7]/10 px-2.5 py-0.5 text-xs font-semibold text-[#22C7C7]">
                  {upcoming.length}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {upcoming.map((trip) => (
                  <TripCard key={trip._id} trip={trip} />
                ))}
              </div>
            </section>
          )}

          {/* ── Past trips ── */}
          {past.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F5F9]">
                  <CheckCircle2 className="h-4 w-4 text-[#9CA3AF]" />
                </div>
                <h2 className="font-bold text-[#111827]">Past trips</h2>
                <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-semibold text-[#6B7280]">
                  {past.length}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {past.map((trip) => (
                  <TripCard key={trip._id} trip={trip} />
                ))}
              </div>
            </section>
          )}

          {/* ── CTA ── */}
          <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Plan ahead</p>
                <h2 className="mt-1 text-xl font-bold text-[#111827]">Ready for your next escape?</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Browse rooms, check availability, and secure your next stay in minutes.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
                >
                  <BedDouble className="h-4 w-4" /> Browse rooms
                </Link>
                <Link
                  href="/dashboard/bookings"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] transition hover:border-[#22C7C7] hover:text-[#22C7C7]"
                >
                  All bookings <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

