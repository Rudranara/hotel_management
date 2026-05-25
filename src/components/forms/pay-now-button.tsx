"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

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
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PayNowButton({
  bookingId,
  amount,
}: {
  bookingId: string;
  amount: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load payment gateway. Please try again.");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = (await res.json()) as {
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        message?: string;
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
            setLoading(false);
          }
        },
        theme: { color: "#22C7C7" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Payment error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#22C7C7] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <CreditCard size={18} />
      )}
      {loading ? "Opening payment..." : `Pay ${amount}`}
    </button>
  );
}

