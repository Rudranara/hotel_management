import Link from "next/link";
import {
  Wallet,
  BedDouble,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Gift,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { requireAuth } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Travel Wallet | Huts4u",
  description: "Manage your Huts4u wallet balance, add money, and track transactions.",
};

// ── Static placeholder data ───────────────────────────────────────────────────

const balance = 4250;
const locked  = 500;

const transactions = [
  { id: "TXN001", type: "credit",  label: "Cashback — Lagoon Villa booking",          amount: 850,  date: "May 24, 2026", status: "completed" },
  { id: "TXN002", type: "debit",   label: "Payment — Sea Breeze Suite (Jun 12–14)",    amount: 3700, date: "May 20, 2026", status: "completed" },
  { id: "TXN003", type: "credit",  label: "Referral bonus — Rohan Verma joined",       amount: 500,  date: "May 17, 2026", status: "completed" },
  { id: "TXN004", type: "credit",  label: "Wallet top-up via UPI",                     amount: 2000, date: "May 10, 2026", status: "completed" },
  { id: "TXN005", type: "debit",   label: "Payment — Skyline Premier Room (May 5–6)",  amount: 1200, date: "May 4, 2026",  status: "completed" },
  { id: "TXN006", type: "debit",   label: "Visa service fee — France",                 amount: 2499, date: "Apr 28, 2026", status: "completed" },
  { id: "TXN007", type: "credit",  label: "Refund — Cancelled train booking",          amount: 650,  date: "Apr 22, 2026", status: "completed" },
  { id: "TXN008", type: "debit",   label: "Payment — Manali Chalet (Mar 20–23)",       amount: 5600, date: "Mar 18, 2026", status: "completed" },
];

const addAmounts = [500, 1000, 2000, 5000];

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function WalletPage() {
  await requireAuth();

  const totalCredit = transactions.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalDebit  = transactions.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);

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
              <p className="mt-0.5 text-4xl font-extrabold text-[#111827]">₹{balance.toLocaleString("en-IN")}</p>
              <p className="mt-1 text-xs text-[#9CA3AF]">
                ₹{locked.toLocaleString("en-IN")} on hold · refreshes after booking confirms
              </p>
            </div>
          </div>

          {/* Quick-add buttons */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Add money</p>
            <div className="flex flex-wrap gap-2">
              {addAmounts.map((amt) => (
                <button
                  key={amt}
                  className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#374151] shadow-sm transition hover:border-[#22C7C7] hover:text-[#22C7C7]"
                >
                  +₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
              <button className="inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]">
                <PlusCircle className="h-3.5 w-3.5" /> Custom
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: TrendingUp,   label: "Total credited",  value: `₹${totalCredit.toLocaleString("en-IN")}`, sub: "all time earnings",    bg: "bg-emerald-50",  ico: "text-emerald-500" },
          { icon: ArrowUpRight, label: "Total spent",     value: `₹${totalDebit.toLocaleString("en-IN")}`,  sub: "across all bookings",  bg: "bg-rose-50",     ico: "text-rose-500"    },
          { icon: Gift,         label: "Cashback earned", value: "₹1,850",                                  sub: "from bookings & refs",  bg: "bg-amber-50",    ico: "text-amber-500"   },
          { icon: ShieldCheck,  label: "Protected funds", value: `₹${balance.toLocaleString("en-IN")}`,     sub: "insured & secured",    bg: "bg-[#22C7C7]/10",ico: "text-[#22C7C7]"   },
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
          { icon: Zap,       title: "Instant payments",     desc: "Use wallet balance at checkout — no OTP, no redirect, instant." },
          { icon: Gift,      title: "Earn cashback",         desc: "Get up to 5% cashback on every booking, credited within 24 hrs." },
          { icon: CreditCard,title: "Secure top-up",         desc: "Add money via UPI, net banking, or card — 256-bit encrypted." },
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
            {transactions.length} records
          </span>
        </div>

        {/* List */}
        <div className="divide-y divide-[#F1F5F9]">
          {transactions.map((txn) => {
            const isCredit = txn.type === "credit";
            return (
              <div key={txn.id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-[#F8FAFC]">
                {/* Icon */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCredit ? "bg-emerald-50" : "bg-rose-50"}`}>
                  {isCredit
                    ? <ArrowDownLeft className="h-4.5 w-4.5 text-emerald-500" />
                    : <ArrowUpRight  className="h-4.5 w-4.5 text-rose-500"    />
                  }
                </div>

                {/* Label + date */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#111827]">{txn.label}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <Clock className="h-3 w-3" /> {txn.date}
                    <span className="flex items-center gap-1">
                      {txn.status === "completed"
                        ? <><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Completed</>
                        : <><XCircle className="h-3 w-3 text-rose-500" /> Failed</>
                      }
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="shrink-0 text-right">
                  <p className={`text-sm font-extrabold ${isCredit ? "text-emerald-600" : "text-rose-500"}`}>
                    {isCredit ? "+" : "−"}₹{txn.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-[#9CA3AF]">{txn.id}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-[#F1F5F9] px-6 py-4">
          <button className="text-sm font-semibold text-[#22C7C7] transition hover:underline">
            Load more transactions
          </button>
        </div>
      </div>

      {/* ── Explore CTA ── */}
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
