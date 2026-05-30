import {
  CreditCard,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Star,
  Smartphone,
  BadgeCheck,
  Lock,
  WalletCards,
} from "lucide-react";

import { requireAuth } from "@/lib/dal";
import { isRazorpayConfigured } from "@/lib/env";
import { getRazorpayInstance, getOrCreateRazorpayCustomer } from "@/lib/razorpay";
import type { Tokens } from "razorpay/dist/types/tokens";
import { DeleteTokenButton } from "./_components/delete-token-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Payment Methods | Huts4u",
  description: "Manage your saved cards and UPI IDs.",
};

// ── Network → gradient colour ─────────────────────────────────────────────────

function cardGradient(network: string): string {
  switch (network.toLowerCase()) {
    case "visa":             return "from-[#1A56DB] to-[#0A3AB5]";
    case "mastercard":       return "from-[#374151] to-[#111827]";
    case "american express": return "from-[#1F7A4D] to-[#14532D]";
    case "rupay":            return "from-[#C2410C] to-[#7C2D12]";
    default:                 return "from-[#4B5563] to-[#1F2937]";
  }
}

// ── Section header ────────────────────────────────────────────────────────────

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatExpiry(month: string | number, year: string | number): string {
  const mm = String(month).padStart(2, "0");
  const yy = String(year).slice(-2);
  return `${mm} / ${yy}`;
}

function upiAddress(vpa: { username: string | null; handle: string | null }): string {
  if (vpa.username && vpa.handle) return `${vpa.username}@${vpa.handle}`;
  return vpa.username ?? vpa.handle ?? "Unknown UPI";
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PaymentMethodsPage() {
  const user = await requireAuth();
  const razorpayUser = user as typeof user & { razorpayCustomerId?: string };

  // Fetch real tokens from Razorpay (server-side)
  let cardTokens: Tokens.RazorpayToken[] = [];
  let upiTokens: Tokens.RazorpayToken[] = [];
  let configured = false;

  if (isRazorpayConfigured()) {
    configured = true;
    try {
      const customerId = await getOrCreateRazorpayCustomer(String(user._id), {
        name: user.name,
        email: user.email,
        phone: user.phone ?? undefined,
        existingCustomerId: razorpayUser.razorpayCustomerId ?? undefined,
      });

      if (customerId) {
        const rzp = getRazorpayInstance();
        const result = await rzp.customers.fetchTokens(customerId);
        const items = result.items as Tokens.RazorpayToken[];
        const active = items.filter((t) => !t.status || t.status === "active");
        cardTokens = active.filter((t) => t.method === "card");
        upiTokens = active.filter((t) => t.method === "upi");
      }
    } catch (err) {
      console.error("[payment-methods page]", err);
      // Silent fallback — show empty state
    }
  }

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Finance</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Payment Methods</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Cards &amp; UPI IDs saved during checkout. Add a new method by making a payment.
          </p>
        </div>
      </div>

      {/* ── Razorpay not configured ── */}
      {!configured && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
          <p className="font-semibold text-amber-800">Payment gateway not configured</p>
          <p className="mt-1 text-sm text-amber-700">
            Set <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">RAZORPAY_KEY_ID</code> and{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">RAZORPAY_KEY_SECRET</code> to
            enable saved payment methods.
          </p>
        </div>
      )}

      {/* ── Trust strip ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Lock,        text: "256-bit encrypted" },
          { icon: ShieldCheck, text: "PCI-DSS compliant" },
          { icon: BadgeCheck,  text: "RBI authorised"    },
          { icon: Zap,         text: "Instant checkout"  },
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
        <SectionHeader label="Debit / Credit" title="Saved Cards" count={cardTokens.length} />

        {cardTokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#D1FAF8] bg-[#F0FFFE] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <CreditCard className="h-6 w-6 text-[#22C7C7]" />
            </div>
            <div>
              <p className="font-semibold text-[#374151]">No saved cards yet</p>
              <p className="mt-0.5 text-sm text-[#9CA3AF]">
                Cards are saved automatically when you pay for a booking.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {cardTokens.map((token) => {
              const card = token.card!;
              const gradient = cardGradient(card.network ?? "");
              return (
                <div key={token.id} className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
                  {/* Card visual */}
                  <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} p-5`}>
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
                    <div className="pointer-events-none absolute -bottom-6 right-10 h-24 w-24 rounded-full bg-white/5" />

                    <div className="flex items-start justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
                        {card.network}
                      </p>
                    </div>

                    {/* Chip */}
                    <div className="mt-4 h-7 w-10 rounded-md bg-white/20" />

                    <p className="mt-4 font-mono text-lg font-bold tracking-[0.2em] text-white">
                      •••• •••• •••• {card.last4}
                    </p>

                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/60">Card holder</p>
                        <p className="text-sm font-semibold text-white">{card.name || "—"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-white/60">Expires</p>
                        <p className="font-mono text-sm font-semibold text-white">
                          {formatExpiry(card.expiry_month, card.expiry_year)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-xs font-semibold text-[#6B7280]">
                      {card.issuer || ""}
                    </span>
                    <DeleteTokenButton tokenId={token.id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── UPI IDs ── */}
      <div>
        <SectionHeader label="UPI" title="UPI IDs" count={upiTokens.length} />

        {upiTokens.length === 0 ? (
          <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-[#D1FAF8] bg-[#F0FFFE] px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
              <Smartphone className="h-5 w-5 text-[#22C7C7]" />
            </div>
            <div>
              <p className="font-semibold text-[#374151]">No saved UPI IDs yet</p>
              <p className="text-sm text-[#9CA3AF]">UPI IDs are saved when you pay via UPI.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {upiTokens.map((token) => {
              const vpa = token.vpa;
              const address = vpa ? upiAddress(vpa) : "Unknown UPI";
              return (
                <div key={token.id} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                    <Smartphone className="h-5 w-5 text-[#22C7C7]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#111827]">{address}</p>
                    <p className="text-xs text-[#9CA3AF]">UPI</p>
                  </div>
                  <DeleteTokenButton tokenId={token.id} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── How to add methods ── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C7C7]/10">
            <WalletCards className="h-5 w-5 text-[#22C7C7]" />
          </div>
          <div>
            <p className="font-semibold text-[#374151]">How to save a payment method</p>
            <p className="mt-0.5 text-sm text-[#6B7280]">
              When you pay for a booking, Razorpay offers to save your card or UPI ID for future
              checkouts. Saved methods appear here automatically.
            </p>
          </div>
        </div>
      </div>

      {/* ── Security info ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Lock,        title: "End-to-end encryption",  desc: "All payment details are encrypted with AES-256 before being stored."    },
          { icon: ShieldCheck, title: "Zero liability promise",  desc: "Any unauthorised transaction is covered under our zero-liability policy." },
          { icon: Star,        title: "Trusted by 50K+ guests", desc: "Over 50,000 guests trust Huts4u with their payment details every month."  },
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Ready to explore?</p>
            <h3 className="mt-1 text-xl font-bold text-[#111827]">Book your next stay</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Browse our curated rooms and your saved methods will appear at checkout.
            </p>
          </div>
          <a
            href="/rooms"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#22C7C7] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
          >
            <CheckCircle2 className="h-4 w-4" /> Browse Rooms
          </a>
        </div>
      </div>

    </div>
  );
}
