import Link from "next/link";
import {
  Gift,
  Star,
  BedDouble,
  ArrowRight,
  Trophy,
  Zap,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Flame,
  Crown,
  BadgeCheck,
  TrendingUp,
  Ticket,
} from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";
import { formatCurrency } from "@/utils/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rewards | Huts4u",
  description: "Earn and redeem Huts4u reward points on every booking.",
};

// ── Static catalogue (no redemption system yet) ───────────────────────────────

const REWARDS = [
  { id: 1, title: "₹500 Off on Next Stay",        pts: 500,  category: "Discount",  img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", tag: "Popular"   },
  { id: 2, title: "Free Airport Transfer",         pts: 800,  category: "Add-on",    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80", tag: "New"       },
  { id: 3, title: "Late Check-out (2 PM)",         pts: 300,  category: "Upgrade",   img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", tag: ""         },
  { id: 4, title: "Complimentary Breakfast",       pts: 400,  category: "Dining",    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", tag: "Hot deal" },
  { id: 5, title: "Room Upgrade (next booking)",   pts: 700,  category: "Upgrade",   img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80", tag: ""         },
  { id: 6, title: "Spa & Wellness Voucher",        pts: 1_200, category: "Lifestyle", img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80", tag: "Premium" },
];

const TIERS = [
  { name: "Silver", icon: Star,   min: 0,      max: 3_999,  color: "text-slate-400",  bg: "bg-slate-50",  border: "border-slate-200"  },
  { name: "Gold",   icon: Trophy, min: 4_000,  max: 9_999,  color: "text-amber-500",  bg: "bg-amber-50",  border: "border-amber-200"  },
  { name: "Plat",   icon: Crown,  min: 10_000, max: Infinity,color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTier(pts: number) {
  return TIERS.findLast((t) => pts >= t.min) ?? TIERS[0]!;
}

function getNextTier(pts: number) {
  return TIERS.find((t) => pts < t.min) ?? null;
}

/** Count consecutive months (back from today) that have ≥1 booking */
function calcStreak(bookingMonths: string[]): number {
  const set = new Set(bookingMonths);
  const now = new Date();
  let streak = 0;
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (set.has(key)) streak++;
    else break;
  }
  return streak;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function RewardsPage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  // Serialize dates
  type BookingRow = {
    _id: string; bookingNumber: string; status: string;
    totalPrice: number; createdAt: string;
    room: { name?: string } | null;
  };
  const all = JSON.parse(JSON.stringify(bookings)) as BookingRow[];

  // Only confirmed / completed bookings earn points (1 pt per ₹10)
  const paid = all.filter((b) => b.status === "confirmed" || b.status === "completed");
  const points = paid.reduce((sum, b) => sum + Math.floor(b.totalPrice / 10), 0);

  const currentTier = getTier(points);
  const nextTierObj  = getNextTier(points);
  const pointsToNext = nextTierObj ? nextTierObj.min - points : 0;
  const progressPct  = nextTierObj
    ? Math.min(100, Math.round(((points - currentTier.min) / (nextTierObj.min - currentTier.min)) * 100))
    : 100;

  // Activity: real paid bookings as earn entries
  const activity = paid.map((b) => ({
    id: b.bookingNumber,
    label: b.room?.name ? `Booking — ${b.room.name}` : `Booking ${b.bookingNumber}`,
    pts: Math.floor(b.totalPrice / 10),
    date: fmtDate(b.createdAt),
    earned: formatCurrency(b.totalPrice),
  }));

  // Streak: consecutive months with ≥1 booking
  const bookingMonths = all
    .filter((b) => b.status !== "cancelled")
    .map((b) => b.createdAt.slice(0, 7)); // "YYYY-MM"
  const streak = calcStreak(bookingMonths);

  // Member since
  const memberSince = new Date(
    (user as { createdAt?: Date | string }).createdAt ?? Date.now(),
  ).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

  const isEmpty = paid.length === 0;

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Loyalty</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Rewards</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Earn points on every booking and redeem exclusive perks</p>
        </div>
        <Link
          href="/rooms"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-auto"
        >
          <BedDouble className="h-4 w-4" /> Book &amp; earn
        </Link>
      </div>

      {/* ── Points hero card ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: points */}
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22C7C7] to-[#1AB5B5] shadow">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Your points</p>
                <p className="mt-0.5 text-4xl font-extrabold text-[#111827]">{points.toLocaleString("en-IN")}</p>
                {nextTierObj ? (
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    {pointsToNext.toLocaleString("en-IN")} pts to unlock{" "}
                    <span className="font-semibold text-amber-500">{nextTierObj.name}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-xs font-semibold text-violet-500">Platinum — highest tier!</p>
                )}
              </div>
            </div>

            {/* Right: tier badges */}
            <div className="flex gap-3">
              {TIERS.map(({ name, icon: Icon, color, bg, border, min }) => {
                const active = currentTier.name === name;
                return (
                  <div
                    key={name}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-4 py-3 ${bg} ${border} ${active ? "ring-2 ring-[#22C7C7]/40" : ""}`}
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                    <span className={`text-xs font-bold ${active ? "text-[#111827]" : "text-[#9CA3AF]"}`}>{name}</span>
                    {active && (
                      <span className="rounded-full bg-[#22C7C7]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22C7C7]">Current</span>
                    )}
                    {!active && (
                      <span className="text-[10px] text-[#9CA3AF]">{min.toLocaleString("en-IN")} pts</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="mb-1.5 flex justify-between text-xs text-[#9CA3AF]">
              <span>{currentTier.name} · {currentTier.min.toLocaleString("en-IN")} pts</span>
              <span className="font-semibold text-[#22C7C7]">{points.toLocaleString("en-IN")} pts</span>
              <span>{nextTierObj ? `${nextTierObj.name} · ${nextTierObj.min.toLocaleString("en-IN")} pts` : "Max tier"}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#22C7C7] to-[#1DDCDC] transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: TrendingUp, label: "Points earned",    value: points.toLocaleString("en-IN"), sub: "from bookings",           bg: "bg-emerald-50",    ico: "text-emerald-500" },
          { icon: Ticket,     label: "Rewards redeemed", value: "0",                            sub: "redemption coming soon",  bg: "bg-amber-50",      ico: "text-amber-500"   },
          { icon: Flame,      label: "Current streak",   value: streak > 0 ? `${streak} mo` : "—", sub: "consecutive months",  bg: "bg-orange-50",     ico: "text-orange-500"  },
          { icon: BadgeCheck, label: "Member since",     value: memberSince,                    sub: `${currentTier.name} tier`, bg: "bg-[#22C7C7]/10", ico: "text-[#22C7C7]"   },
        ].map(({ icon: Icon, label, value, sub, bg, ico }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg}`}>
              <Icon className={`h-5 w-5 ${ico}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-[#111827]">{value}</p>
              <p className="text-xs font-semibold text-[#6B7280]">{label}</p>
              <p className="text-[11px] text-[#9CA3AF]">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── How to earn ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: BedDouble, title: "Book a room",      desc: "Earn 1 point for every ₹10 spent on room bookings.",   pts: "Up to 500 pts / stay" },
          { icon: Zap,       title: "Refer a friend",   desc: "Get 300 bonus points for every friend who books.",      pts: "300 pts / referral"   },
          { icon: ShieldCheck,title: "Complete profile",desc: "Fill in your profile once and earn an instant 100 pts.", pts: "100 pts one-time"     },
        ].map(({ icon: Icon, title, desc, pts }) => (
          <div key={title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <Icon className="h-5 w-5 text-[#22C7C7]" />
            </div>
            <p className="mt-3 font-bold text-[#111827]">{title}</p>
            <p className="mt-1 text-sm text-[#6B7280]">{desc}</p>
            <span className="mt-3 inline-block rounded-full bg-[#22C7C7]/10 px-3 py-1 text-xs font-semibold text-[#22C7C7]">{pts}</span>
          </div>
        ))}
      </div>

      {/* ── Redeem rewards ── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Catalogue</p>
            <h2 className="mt-0.5 text-lg font-bold text-[#111827]">Redeem Rewards</h2>
          </div>
          <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#6B7280]">
            {REWARDS.length} available
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REWARDS.map((r) => {
            const canRedeem = points >= r.pts;
            return (
              <div key={r.id} className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition hover:shadow-md">
                {/* Image */}
                <div className="relative h-36 overflow-hidden bg-[#F1F5F9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {r.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#22C7C7] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {r.tag}
                    </span>
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-[#374151]">
                    {r.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="font-semibold text-[#111827]">{r.title}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                    <Gift className="h-3.5 w-3.5 text-[#22C7C7]" />
                    <span className="font-bold text-[#22C7C7]">{r.pts.toLocaleString("en-IN")} pts</span>
                    <span>required</span>
                  </div>
                  <button
                    disabled={!canRedeem}
                    className={`mt-3 w-full rounded-full py-2 text-xs font-bold transition ${
                      canRedeem
                        ? "bg-[#22C7C7] text-white hover:bg-[#1AB5B5]"
                        : "cursor-not-allowed bg-[#F1F5F9] text-[#9CA3AF]"
                    }`}
                  >
                    {canRedeem ? "Redeem now" : `Need ${(r.pts - points).toLocaleString("en-IN")} more pts`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Points activity ── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F1F5F9] px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">History</p>
            <h2 className="mt-0.5 text-lg font-bold text-[#111827]">Points Activity</h2>
          </div>
          <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#6B7280]">
            {activity.length} record{activity.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* List */}
        {isEmpty ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9]">
              <Gift className="h-6 w-6 text-[#9CA3AF]" />
            </div>
            <p className="font-semibold text-[#111827]">No activity yet</p>
            <p className="text-sm text-[#6B7280]">Points will appear here after your first confirmed booking.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9]">
            {activity.map((a) => (
              <div key={a.id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-[#F8FAFC]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#111827]">{a.label}</p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <Clock className="h-3 w-3" /> {a.date}
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600">Earned · {a.earned} spend</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-extrabold text-emerald-600">
                    +{a.pts.toLocaleString("en-IN")} pts
                  </p>
                  <p className="text-[10px] text-[#9CA3AF]">{a.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Keep earning</p>
            <h2 className="mt-1 text-xl font-bold text-[#111827]">
              {nextTierObj
                ? `You're ${pointsToNext.toLocaleString("en-IN")} pts away from ${nextTierObj.name}`
                : "You've reached the highest tier!"}
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              {nextTierObj
                ? "Book your next stay to earn more points and unlock exclusive benefits."
                : "Enjoy Platinum perks on every booking."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
            >
              <BedDouble className="h-4 w-4" /> Book &amp; earn
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] transition hover:border-[#22C7C7] hover:text-[#22C7C7]"
            >
              View deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
