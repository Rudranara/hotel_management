import Link from "next/link";
import {
  Wallet,
  BedDouble,
  ArrowRight,
  ArrowUpRight,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Gift,
  CreditCard,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";
import { formatCurrency } from "@/utils/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Travel Wallet | Huts4u",
  description: "Manage your Huts4u wallet balance, add money, and track transactions.",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type BookingTxn = {
  _id: string;
  bookingNumber: string;
  status: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  createdAt: string;
  room: { name?: string; type?: string } | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const ADD_AMOUNTS = [500, 1000, 2000, 5000];

function fmtRange(checkIn: string, checkOut: string) {
  const inDate  = new Date(checkIn);
  const outDate = new Date(checkOut);
  const sameMonth = inDate.getMonth() === outDate.getMonth() && inDate.getFullYear() === outDate.getFullYear();
  const inFmt  = inDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const outFmt = sameMonth
    ? outDate.toLocaleDateString("en-IN", { day: "numeric" })
    : outDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return `${inFmt}–${outFmt}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function WalletPage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  // Serialize lean docs (Date → string)
  const all = JSON.parse(JSON.stringify(bookings)) as BookingTxn[];

  // Only confirmed / completed bookings count as real spend
  const paid = all.filter((b) => b.status === "confirmed" || b.status === "completed");
  const totalSpent = paid.reduce((s, b) => s + b.totalPrice, 0);

  // Derived cashback: 2% of total paid spend (UI-only, not stored in DB)
  const cashbackEarned = Math.floor(totalSpent * 0.02);

  const isEmpty = paid.length === 0;

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Finance</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Travel Wallet</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Your Huts4u balance, top-ups, and transaction history</p>
        </div>
        <Link
          href="/rooms"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-auto"
        >
          <BedDouble className="h-4 w-4" />
          Book a stay
        </Link>
      </div>

      {/* ── Balance card ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          {/* Balance */}
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22C7C7] to-[#1AB5B5] shadow">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Available balance</p>
              <p className="mt-0.5 text-4xl font-extrabold text-[#111827]">₹0</p>
              <p className="mt-1 text-xs text-[#9CA3AF]">
                Top up your wallet to pay instantly at checkout
              </p>
            </div>
          </div>

          {/* Quick-add buttons (UI-only) */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Add money</p>
            <div className="flex flex-wrap gap-2">
              {ADD_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  disabled
                  title="Wallet top-up coming soon"
                  className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#374151] shadow-sm opacity-50 cursor-not-allowed"
                >
                  +₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
              <button
                disabled
                title="Wallet top-up coming soon"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-2 text-sm font-semibold text-white shadow-sm opacity-50 cursor-not-allowed"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Custom
              </button>
            </div>
            <p className="text-[11px] text-[#9CA3AF]">Wallet top-up coming soon</p>
          </div>
        </div>
      </div>
      {/* ── Stats ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: TrendingUp,   label: "Total credited",  value: "₹0",                              sub: "top-up balance",        bg: "bg-emerald-50",   ico: "text-emerald-500" },
          { icon: ArrowUpRight, label: "Total spent",     value: formatCurrency(totalSpent),         sub: "across all bookings",   bg: "bg-rose-50",      ico: "text-rose-500"    },
          { icon: Gift,         label: "Cashback earned", value: formatCurrency(cashbackEarned),     sub: "2% on confirmed stays", bg: "bg-amber-50",     ico: "text-amber-500"   },
          { icon: ShieldCheck,  label: "Bookings paid",   value: String(paid.length),                sub: "confirmed & completed", bg: "bg-[#22C7C7]/10", ico: "text-[#22C7C7]"   },
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

      {/* ── How it works ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Zap,        title: "Instant payments", desc: "Use wallet balance at checkout — no OTP, no redirect, instant." },
          { icon: Gift,       title: "Earn cashback",    desc: "Get up to 2% cashback on every booking, credited within 24 hrs." },
          { icon: CreditCard, title: "Secure top-up",    desc: "Add money via UPI, net banking, or card — 256-bit encrypted." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <Icon className="h-5 w-5 text-[#22C7C7]" />
            </div>
            <p className="mt-3 font-bold text-[#111827]">{title}</p>
            <p className="mt-1 text-sm text-[#6B7280]">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── Transaction history ── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F1F5F9] px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">History</p>
            <h2 className="mt-0.5 text-lg font-bold text-[#111827]">Transactions</h2>
          </div>
          <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#6B7280]">
            {paid.length} record{paid.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* List */}
        {isEmpty ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9]">
              <Wallet className="h-6 w-6 text-[#9CA3AF]" />
            </div>
            <p className="font-semibold text-[#111827]">No transactions yet</p>
            <p className="text-sm text-[#6B7280]">Your booking payments will appear here once confirmed.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9]">
            {paid.map((txn) => {
              const label = txn.room?.name
                ? `Payment — ${txn.room.name} (${fmtRange(txn.checkIn, txn.checkOut)})`
                : `Payment — Booking ${txn.bookingNumber}`;
              return (
                <div key={txn._id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-[#F8FAFC]">
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                    <ArrowUpRight className="h-5 w-5 text-rose-500" />
                  </div>

                  {/* Label + date */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#111827]">{label}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[#9CA3AF]">
                      <Clock className="h-3 w-3" /> {fmtDate(txn.createdAt)}
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" />
                        {txn.status === "completed" ? "Completed" : "Confirmed"}
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-extrabold text-rose-500">
                      −{formatCurrency(txn.totalPrice)}
                    </p>
                    <p className="text-[10px] text-[#9CA3AF]">{txn.bookingNumber}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Spend your balance</p>
            <h2 className="mt-1 text-xl font-bold text-[#111827]">Ready to book your next stay?</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              Use your wallet balance at checkout for instant, zero-friction payments.
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
