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
  const [dateError, setDateError] = useState("");

  function validateDates(ci: string, co: string) {
    if (!ci) return "";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ciDate = new Date(ci);
    if (ciDate < today) return "Check-in date must be today or in the future.";
    if (co) {
      const coDate = new Date(co);
      if (coDate <= ciDate) return "Check-out must be at least 1 day after check-in.";
    }
    return "";
  }

  function handleCheckInChange(value: string) {
    setCheckIn(value);
    setDateError(validateDates(value, checkOut));
  }

  function handleCheckOutChange(value: string) {
    setCheckOut(value);
    setDateError(validateDates(checkIn, value));
  }

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
    const ci = String(formData.get("checkIn") ?? "");
    const co = String(formData.get("checkOut") ?? "");
    const err = validateDates(ci, co);
    if (err) {
      setDateError(err);
      return;
    }
    setLoading(true);

    try {
      const payload = {
        room: roomId,
        checkIn: String(formData.get("checkIn") ?? ""),
        checkOut: String(formData.get("checkOut") ?? ""),
        guests: Number(formData.get("guests") ?? 1),
        specialRequests: String(formData.get("specialRequests") ?? ""),
      };

      const response = await apiRequest<{ bookingId: string; bookingNumber: string }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success(response.message ?? `Booking confirmed for ${roomName}.`);
      startTransition(() => {
        router.push(`/booking/confirmation/${response.data.bookingId}`);
        router.refresh();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Booking failed.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#22C7C7]/60 focus:bg-white/8 [color-scheme:dark]";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45";

  return (
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="sticky top-6 space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]/80">Your reservation</p>
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
            onChange={(e) => handleCheckInChange(e.target.value)}
            className={`${inputCls} ${dateError ? "border-red-500/60" : ""}`}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Check-out</span>
          <input
            type="date"
            name="checkOut"
            required
            value={checkOut}
            onChange={(e) => handleCheckOutChange(e.target.value)}
            min={checkIn}
            className={`${inputCls} ${dateError ? "border-red-500/60" : ""}`}
          />
        </label>
      </div>
      {dateError && <p className="mt-1 text-xs text-red-400/80">{dateError}</p>}

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
        <div className="rounded-2xl border border-[#22C7C7]/15 bg-[#22C7C7]/5 p-4 text-sm">
          <div className="flex justify-between text-white/60">
            <span>Rate</span>
            <span>₹{pricePerNight.toLocaleString("en-IN")}/night</span>
          </div>
          <div className="mt-1 flex justify-between text-white/60">
            <span>Nights</span>
            <span>{nights}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-semibold text-white">
            <span>Total</span>
            <span className="text-[#22C7C7]">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#22C7C7] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
      >
        {loading ? "Processing..." : nights > 0 ? `Confirm · ₹${total.toLocaleString("en-IN")}` : "Confirm booking"}
      </button>

      <p className="text-center text-xs text-white/30">Free cancellation within 24 hours of booking</p>
    </form>
  );
}
