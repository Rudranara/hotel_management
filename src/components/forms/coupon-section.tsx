"use client";

import { useState } from "react";
import { Tag, CheckCircle2, XCircle, Loader2 } from "lucide-react";

import { CreditCard } from "lucide-react";
import { COUPONS } from "@/lib/constants";
import { formatCurrency } from "@/utils/format";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CouponSection({
  bookingId,
  totalPrice,
}: {
  bookingId: string;
  totalPrice: number;
}) {
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState<{
    code: string;
    discount: number;
    finalAmount: number;
    label: string;
  } | null>(null);
  const [paying, setPaying] = useState(false);

  const displayAmount = applied ? applied.finalAmount : totalPrice;

  async function handleApply() {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setApplying(true);
    setError("");
    try {
      const res = await fetch("/api/apply-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed, totalPrice }),
      });
      const data = (await res.json()) as {
        data?: { discount: number; finalAmount: number; label: string };
        message?: string;
      };
      if (!res.ok) { setError(data.message ?? "Invalid coupon."); return; }
      setApplied({ code: trimmed, ...data.data! });
    } catch {
      setError("Unable to apply coupon. Try again.");
    } finally {
      setApplying(false);
    }
  }

  function handleRemove() {
    setApplied(null);
    setCode("");
    setError("");
  }

  async function handlePay() {
    setPaying(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load payment gateway. Please try again.");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          finalAmount: applied ? applied.finalAmount : undefined,
        }),
      });
      const data = (await res.json()) as {
        orderId?: string; amount?: number; currency?: string; keyId?: string; message?: string;
      };
      if (!res.ok) throw new Error(data.message ?? "Failed to create order");

      const rzp = new window.Razorpay({
        key: data.keyId!,
        amount: data.amount!,
        currency: data.currency ?? "INR",
        name: "Huts4u",
        description: "Room Booking Payment",
        order_id: data.orderId!,
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = (await verifyRes.json()) as { message?: string };
            if (!verifyRes.ok) throw new Error(verifyData.message ?? "Payment verification failed");
            window.location.href = `/booking/confirmation/${bookingId}?payment=success`;
          } catch (err) {
            alert(err instanceof Error ? err.message : "Payment verification failed. Contact support.");
            setPaying(false);
          }
        },
        theme: { color: "#22C7C7" },
        modal: { ondismiss: () => setPaying(false) },
      });

      rzp.open();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Payment error. Please try again.");
      setPaying(false);
    }
  }

  const hints = Object.entries(COUPONS).map(([k, v]) => ({ code: k, label: v.label }));

  return (
    <div className="mt-6 space-y-4">
      {/* Coupon box */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1A2235]">
          <Tag size={15} className="text-[#0057D9]" />
          Have a coupon code?
        </p>

        {applied ? (
          /* Applied state */
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-emerald-800">{applied.code}</p>
                <p className="text-xs text-emerald-700">{applied.label}</p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="rounded-full p-1 text-emerald-500 transition hover:bg-emerald-100 hover:text-emerald-700"
            >
              <XCircle size={16} />
            </button>
          </div>
        ) : (
          /* Input state */
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                placeholder="Enter coupon code"
                className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-2.5 text-sm font-mono tracking-widest text-[#1A2235] placeholder:font-sans placeholder:tracking-normal placeholder:text-[#9CA3AF] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15"
              />
              <button
                onClick={handleApply}
                disabled={applying || !code.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-[#0057D9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003A8C] disabled:opacity-50"
              >
                {applying && <Loader2 size={14} className="animate-spin" />}
                Apply
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                <XCircle size={12} /> {error}
              </p>
            )}
            {/* Available codes hint */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {hints.map(({ code: c }) => (
                <button
                  key={c}
                  onClick={() => { setCode(c); setError(""); }}
                  className="rounded-full border border-[#DBEAFE] bg-[#EEF4FF] px-2.5 py-0.5 text-[11px] font-mono font-semibold text-[#0057D9] transition hover:bg-[#DBEAFE]"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Price breakdown</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#475569]">
            <span>Booking total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          {applied && (
            <div className="flex justify-between font-semibold text-emerald-600">
              <span>Discount ({applied.code})</span>
              <span>− {formatCurrency(applied.discount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-[#E5E7EB] pt-2 text-base font-bold text-[#1A2235]">
            <span>You pay</span>
            <span className="text-[#0057D9]">{formatCurrency(displayAmount)}</span>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={paying}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#22C7C7] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
      >
        {paying ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
        {paying ? "Opening payment..." : `Pay ${formatCurrency(displayAmount)} Securely`}
      </button>
    </div>
  );
}
