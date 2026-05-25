"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { XCircle } from "lucide-react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleCancel() {
    setLoading(true);
    setConfirming(false);
    try {
      await apiRequest(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" }),
      });
      toast.success("Booking cancelled.");
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cancellation failed.");
    } finally {
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#6B7280]">Cancel this booking?</span>
        <button
          onClick={() => void handleCancel()}
          disabled={loading}
          className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
        >
          {loading ? "Cancelling…" : "Yes, cancel"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#6B7280] transition hover:bg-[#F1F5F9]"
        >
          Keep booking
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
    >
      <XCircle className="h-3.5 w-3.5" />
      Cancel booking
    </button>
  );
}
