"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

export function BookingForm({
  roomId,
  roomName,
  pricePerNight = 0,
}: {
  roomId: string;
  roomName: string;
  pricePerNight?: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;
  const total = nights * pricePerNight;

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

  const inputCls =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-400/60 focus:bg-white/8 [color-scheme:dark]";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45";

  return (
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="sticky top-6 space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-300/70">Your reservation</p>
        <h2 className="mt-1 text-xl font-semibold text-white">{roomName}</h2>
      </div>

      {/* Dates */}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Check-in</span>
          <input
            type="date"
            name="checkIn"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Check-out</span>
          <input
            type="date"
            name="checkOut"
            required
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
            className={inputCls}
          />
        </label>
      </div>

      {/* Guests */}
      <label className="block">
        <span className={labelCls}>Guests</span>
        <input
          type="number"
          name="guests"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={inputCls}
        />
      </label>

      {/* Special requests */}
      <label className="block">
        <span className={labelCls}>Special requests</span>
        <textarea
          name="specialRequests"
          rows={3}
          className={`${inputCls} resize-none placeholder:text-white/30`}
          placeholder="Airport transfer, early check-in, dietary notes..."
        />
      </label>

      {/* Price summary */}
      {nights > 0 && (
        <div className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-4 text-sm">
          <div className="flex justify-between text-white/60">
            <span>Rate</span>
            <span>${pricePerNight}/night</span>
          </div>
          <div className="mt-1 flex justify-between text-white/60">
            <span>Nights</span>
            <span>{nights}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-semibold text-white">
            <span>Total</span>
            <span className="text-amber-300">${total.toLocaleString()}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-amber-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
      >
        {loading ? "Processing..." : nights > 0 ? `Confirm · $${total.toLocaleString()}` : "Confirm booking"}
      </button>

      <p className="text-center text-xs text-white/30">Free cancellation within 24 hours of booking</p>
    </form>
  );
}
