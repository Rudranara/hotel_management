import Link from "next/link";
import {
  CreditCard,
  BedDouble,
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Star,
  Trash2,
  Smartphone,
  Building2,
  Wallet,
  BadgeCheck,
  Lock,
} from "lucide-react";

import { requireAuth } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Payment Methods | Huts4u",
  description: "Manage your saved cards, UPI IDs, and net banking accounts.",
};

// ── Static placeholder data ───────────────────────────────────────────────────

const cards = [
  { id: "c1", brand: "Visa",       last4: "4242", expiry: "08 / 28", holder: "Arjun Sharma",  primary: true,  color: "from-[#1A56DB] to-[#0A3AB5]" },
  { id: "c2", brand: "Mastercard", last4: "5678", expiry: "03 / 27", holder: "Arjun Sharma",  primary: false, color: "from-[#374151] to-[#111827]" },
];

const upiIds = [
  { id: "u1", upi: "arjun@okaxis",   app: "Axis Pay",   primary: true  },
  { id: "u2", upi: "arjun@ybl",      app: "PhonePe",    primary: false },
];

const netBanking = [
  { id: "n1", bank: "HDFC Bank",       account: "HDFC ···· 9823", primary: false },
  { id: "n2", bank: "State Bank",      account: "SBI  ···· 4410", primary: false },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ label, title, count }: { label: string; title: string; count: number }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">{label}</p>
        <h2 className="mt-0.5 text-lg font-bold text-[#111827]">{title}</h2>
      </div>
      <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#6B7280]">
        {count} saved
      </span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function PaymentMethodsPage() {
  await requireAuth();

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Finance</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Payment Methods</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Manage your saved cards, UPI IDs, and bank accounts</p>
        </div>
        <button className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-auto">
          <PlusCircle className="h-4 w-4" /> Add new method
        </button>
      </div>

      {/* ── Trust strip ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Lock,       text: "256-bit encrypted"  },
          { icon: ShieldCheck,text: "PCI-DSS compliant"  },
          { icon: BadgeCheck, text: "RBI authorised"     },
          { icon: Zap,        text: "Instant checkout"   },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#22C7C7]/10">
              <Icon className="h-4 w-4 text-[#22C7C7]" />
            </div>
            <span className="text-xs font-semibold text-[#374151]">{text}</span>
          </div>
        ))}
      </div>

      {/* ── Saved cards ── */}
      <div>
        <SectionHeader label="Debit / Credit" title="Saved Cards" count={cards.length} />
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.id} className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
              {/* Card visual */}
              <div className={`relative overflow-hidden bg-gradient-to-br ${card.color} p-5`}>
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -bottom-6 right-10 h-24 w-24 rounded-full bg-white/5" />

                <div className="flex items-start justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">{card.brand}</p>
                  {card.primary && (
                    <span className="rounded-full bg-[#22C7C7] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Primary
                    </span>
                  )}
                </div>

                {/* Chip */}
                <div className="mt-4 h-7 w-10 rounded-md bg-white/20" />

                <p className="mt-4 font-mono text-lg font-bold tracking-[0.2em] text-white">
                  •••• •••• •••• {card.last4}
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60">Card holder</p>
                    <p className="text-sm font-semibold text-white">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-white/60">Expires</p>
                    <p className="font-mono text-sm font-semibold text-white">{card.expiry}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-5 py-3">
                {!card.primary ? (
                  <button className="text-xs font-semibold text-[#22C7C7] transition hover:underline">
                    Set as primary
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Default card
                  </span>
                )}
                <button className="flex items-center gap-1 text-xs font-semibold text-rose-400 transition hover:text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add card tile */}
          <button className="flex h-full min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#D1FAF8] bg-[#F0FFFE] transition hover:border-[#22C7C7]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <PlusCircle className="h-5 w-5 text-[#22C7C7]" />
            </div>
            <p className="text-sm font-semibold text-[#22C7C7]">Add a new card</p>
          </button>
        </div>
      </div>

      {/* ── UPI IDs ── */}
      <div>
        <SectionHeader label="UPI" title="UPI IDs" count={upiIds.length} />
        <div className="space-y-3">
          {upiIds.map((u) => (
            <div key={u.id} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                <Smartphone className="h-5 w-5 text-[#22C7C7]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#111827]">{u.upi}</p>
                <p className="text-xs text-[#9CA3AF]">{u.app}</p>
              </div>
              {u.primary
                ? <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Primary</span>
                : <button className="text-xs font-semibold text-[#22C7C7] transition hover:underline">Set primary</button>
              }
              <button className="flex items-center gap-1 text-xs font-semibold text-rose-400 transition hover:text-rose-600">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Add UPI */}
          <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-[#D1FAF8] bg-[#F0FFFE] px-5 py-4 transition hover:border-[#22C7C7]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <PlusCircle className="h-4 w-4 text-[#22C7C7]" />
            </div>
            <span className="text-sm font-semibold text-[#22C7C7]">Add a UPI ID</span>
          </button>
        </div>
      </div>

      {/* ── Net banking ── */}
      <div>
        <SectionHeader label="Bank transfer" title="Net Banking" count={netBanking.length} />
        <div className="space-y-3">
          {netBanking.map((n) => (
            <div key={n.id} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                <Building2 className="h-5 w-5 text-[#22C7C7]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#111827]">{n.bank}</p>
                <p className="text-xs text-[#9CA3AF]">{n.account}</p>
              </div>
              <button className="text-xs font-semibold text-[#22C7C7] transition hover:underline">Set primary</button>
              <button className="flex items-center gap-1 text-xs font-semibold text-rose-400 transition hover:text-rose-600">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Add bank */}
          <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-[#D1FAF8] bg-[#F0FFFE] px-5 py-4 transition hover:border-[#22C7C7]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <PlusCircle className="h-4 w-4 text-[#22C7C7]" />
            </div>
            <span className="text-sm font-semibold text-[#22C7C7]">Add a bank account</span>
          </button>
        </div>
      </div>

      {/* ── Security info ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Lock,        title: "End-to-end encryption",  desc: "All payment details are encrypted with AES-256 before being stored."   },
          { icon: ShieldCheck, title: "Zero liability promise",  desc: "Any unauthorised transaction is covered under our zero-liability policy." },
          { icon: Star,        title: "Trusted by 50K+ guests", desc: "Over 50,000 guests trust Huts4u with their payment details every month." },
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

      {/* ── Explore CTA ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Ready to book?</p>
            <h2 className="mt-1 text-xl font-bold text-[#111827]">Pay instantly with your saved methods</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              One-tap checkout — no re-entering card details every time.
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
              href="/dashboard/wallet"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] transition hover:border-[#22C7C7] hover:text-[#22C7C7]"
            >
              <Wallet className="h-4 w-4" /> Travel Wallet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
