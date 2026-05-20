"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

export function BookingForm({
  roomId,
  roomName,
}: {
  roomId: string;
  roomName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      const payload = {
        room: roomId,
        checkIn: String(formData.get("checkIn") ?? ""),
        checkOut: String(formData.get("checkOut") ?? ""),
        guests: Number(formData.get("guests") ?? 1),
        specialRequests: String(formData.get("specialRequests") ?? ""),
      };

      const response = await apiRequest<{ bookingNumber: string }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success(response.message ?? `Booking confirmed for ${roomName}.`);
      startTransition(() => {
        router.push("/dashboard/bookings");
        router.refresh();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Booking failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="space-y-4 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Check-in</span>
          <input
            type="date"
            name="checkIn"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Check-out</span>
          <input
            type="date"
            name="checkOut"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-white/70">Guests</span>
        <input
          type="number"
          name="guests"
          min={1}
          max={10}
          defaultValue={2}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm text-white/70">Special requests</span>
        <textarea
          name="specialRequests"
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-amber-200"
          placeholder="Airport transfer, early check-in, dietary notes..."
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-100 disabled:opacity-60"
      >
        {loading ? "Processing booking..." : "Confirm booking"}
      </button>
    </form>
  );
}
