import Image from "next/image";
import Link from "next/link";
import {
  BedDouble, CalendarDays, ChevronRight, Clock, CreditCard,
  MapPin, Shield, Star, TrendingUp, Users,
} from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";
import { formatDate, diffInNights } from "@/utils/date";
import { formatCurrency } from "@/utils/format";

import { BookingCard } from "@/components/booking-card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Huts4u",
  description: "View your bookings, upcoming stays, and account overview.",
};

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
  completed: "bg-sky-50 text-sky-700 border border-sky-200",
};

function getLoyaltyTier(count: number) {
  if (count >= 10) return { label: "Platinum Member", bg: "bg-indigo-50 text-indigo-700 border border-indigo-200" };
  if (count >= 5)  return { label: "Gold Member",     bg: "bg-amber-50 text-amber-700 border border-amber-200" };
  return                  { label: "Silver Member",   bg: "bg-slate-100 text-slate-600 border border-slate-200" };
}

export default async function DashboardPage() {
  const user = await requireAuth();
  const { bookings, reviews } = await getDashboardData(String(user._id));

  const now = new Date();
  const upcoming  = bookings.filter((b) => new Date(b.checkIn) > now && b.status !== "cancelled");
  const active    = bookings.find((b) => new Date(b.checkIn) <= now && new Date(b.checkOut) >= now && b.status !== "cancelled");
  const completed = bookings.filter((b) => b.status === "completed");
  const totalSpent = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const totalNights = completed.reduce((sum, b) => sum + diffInNights(b.checkIn, b.checkOut), 0);

  const nextStay   = active ?? upcoming[0] ?? null;
  const loyalty    = getLoyaltyTier(bookings.length);
  const initials   = user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const memberYear = new Date((user as { createdAt?: Date | string }).createdAt ?? now).getFullYear();

  return (
    <div className="space-y-8">

      {/* ── Welcome banner ──────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-2/5 bg-gradient-to-l from-[#22C7C7]/6 to-transparent" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#22C7C7] text-xl font-bold text-white shadow">
              {initials}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Welcome back</p>
              <h1 className="mt-0.5 text-2xl font-bold text-[#111827]">{user.name}</h1>
              <div className="mt-1.5 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${loyalty.bg}`}>{loyalty.label}</span>
                <span className="text-xs text-[#9CA3AF]">Since {memberYear}</span>
              </div>
            </div>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-center"
          >
            <BedDouble className="h-4 w-4" />
            Book a stay
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3.5 py-2 text-[#6B7280]">
            <CalendarDays className="h-4 w-4 text-[#22C7C7]" />
            {new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now)}
          </div>
          {active && (
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-emerald-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-medium">Active stay — {(active.room as { name?: string })?.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Active stay spotlight ────────────────────────────────── */}
      {active && (
        <div className="overflow-hidden rounded-2xl border border-[#22C7C7]/25 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row">
            {(active.room as { images?: string[] })?.images?.[0] && (
              <div className="relative h-52 shrink-0 sm:h-auto sm:w-60">
                <Image
                  src={(active.room as { images: string[] }).images[0]}
                  alt={(active.room as { name?: string })?.name ?? "Room"}
                  fill className="object-cover"
                  sizes="(max-width:640px) 100vw, 240px"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-center gap-4 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">You are currently checked in</p>
                <h2 className="mt-1 text-xl font-bold text-[#111827]">{(active.room as { name?: string })?.name}</h2>
                {(active.room as { location?: string })?.location && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
                    <MapPin className="h-3.5 w-3.5 text-[#22C7C7]" />
                    {(active.room as { location: string }).location}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2.5">
                  <p className="text-xs text-[#9CA3AF]">Check-in</p>
                  <p className="font-semibold text-[#111827]">{formatDate(active.checkIn)}</p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2.5">
                  <p className="text-xs text-[#9CA3AF]">Check-out</p>
                  <p className="font-semibold text-[#111827]">{formatDate(active.checkOut)}</p>
                </div>
                <div className="rounded-xl border border-[#22C7C7]/20 bg-[#22C7C7]/5 px-4 py-2.5">
                  <p className="text-xs text-[#22C7C7]">Duration</p>
                  <p className="font-semibold text-[#111827]">{diffInNights(active.checkIn, active.checkOut)} nights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Stats grid ───────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BedDouble,  label: "Total bookings", value: bookings.length,            sub: "all time",            iconBg: "bg-[#22C7C7]/10 text-[#22C7C7]" },
          { icon: Clock,      label: "Upcoming stays", value: upcoming.length,            sub: "confirmed & pending", iconBg: "bg-amber-50 text-amber-500"      },
          { icon: CreditCard, label: "Total spent",    value: formatCurrency(totalSpent), sub: "on confirmed stays",  iconBg: "bg-emerald-50 text-emerald-600"  },
          { icon: Star,       label: "Nights stayed",  value: totalNights,                sub: "completed stays",     iconBg: "bg-indigo-50 text-indigo-500"    },
        ].map(({ icon: Icon, label, value, sub, iconBg }) => (
          <div key={label} className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#6B7280]">{label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-[#111827]">{value}</p>
            <p className="mt-1 text-xs text-[#9CA3AF]">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Next stay + Quick actions ─────────────────────────────── */}
      <div className={`grid gap-6 ${nextStay && !active ? "lg:grid-cols-2" : ""}`}>
        {nextStay && !active && (
          <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
            {(nextStay.room as { images?: string[] })?.images?.[0] && (
              <div className="relative h-44">
                <Image
                  src={(nextStay.room as { images: string[] }).images[0]}
                  alt={(nextStay.room as { name?: string })?.name ?? "Room"}
                  fill className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[nextStay.status]}`}>
                  Upcoming
                </span>
              </div>
            )}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Your next stay</p>
              <h3 className="mt-1 text-lg font-bold text-[#111827]">{(nextStay.room as { name?: string })?.name ?? "Reserved room"}</h3>
              {(nextStay.room as { location?: string })?.location && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <MapPin className="h-3.5 w-3.5 text-[#22C7C7]" />
                  {(nextStay.room as { location: string }).location}
                </p>
              )}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5">
                  <p className="text-xs text-[#9CA3AF]">Check-in</p>
                  <p className="font-semibold text-[#111827]">{formatDate(nextStay.checkIn)}</p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5">
                  <p className="text-xs text-[#9CA3AF]">Check-out</p>
                  <p className="font-semibold text-[#111827]">{formatDate(nextStay.checkOut)}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">{diffInNights(nextStay.checkIn, nextStay.checkOut)} nights</span>
                <span className="font-bold text-[#111827]">{formatCurrency(nextStay.totalPrice)}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9CA3AF]">Quick actions</p>
          {[
            { href: "/dashboard/bookings", icon: CalendarDays, title: "All bookings",  desc: "View and manage every reservation",   iconBg: "bg-[#22C7C7]/10 text-[#22C7C7]" },
            { href: "/rooms",              icon: BedDouble,    title: "Browse rooms",  desc: "Find and book your next stay",         iconBg: "bg-amber-50 text-amber-500"      },
            { href: "/dashboard/profile",  icon: Users,        title: "Your profile",  desc: "Update personal info and preferences", iconBg: "bg-indigo-50 text-indigo-500"    },
          ].map(({ href, icon: Icon, title, desc, iconBg }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition hover:border-[#22C7C7]/30 hover:shadow-md"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-[#111827]">{title}</p>
                <p className="text-sm text-[#9CA3AF]">{desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#D1D5DB] transition group-hover:translate-x-0.5 group-hover:text-[#22C7C7]" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Recent bookings ──────────────────────────────────────── */}
      {bookings.length > 0 ? (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#111827]">Recent bookings</h2>
              <p className="text-sm text-[#9CA3AF]">{bookings.length} reservation{bookings.length !== 1 ? "s" : ""} total</p>
            </div>
            {bookings.length > 3 && (
              <Link href="/dashboard/bookings" className="text-sm font-semibold text-[#22C7C7] hover:text-[#1AB5B5]">
                View all →
              </Link>
            )}
          </div>
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <BookingCard key={String(booking._id)} booking={booking as never} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Shield,     title: "Safe booking",     desc: "Free cancellation within 24 hours of booking" },
            { icon: Star,       title: "Curated stays",    desc: "Every room is quality-verified by our team"   },
            { icon: TrendingUp, title: "Best rate promise", desc: "We match any lower price you find online"     },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C7C7]/10 text-[#22C7C7]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-semibold text-[#111827]">{title}</p>
              <p className="mt-1 text-sm text-[#9CA3AF]">{desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
