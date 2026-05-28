"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { CalendarX } from "lucide-react";

import { apiRequest } from "@/api/client";

export function BookingForm({
  roomId,
  roomName,
  pricePerNight = 0,
  blockedRanges = [],
}: {
  roomId: string;
  roomName: string;
  pricePerNight?: number;
  blockedRanges?: { from: string; to: string }[];
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
      const overlaps = blockedRanges.some(
        (r) => ciDate < new Date(r.to) && coDate > new Date(r.from),
      );
      if (overlaps) return "These dates overlap with an existing reservation. Please choose different dates.";
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
    "w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-[#1A2235] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15 [color-scheme:light]";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]";

  return (
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="sticky top-6 space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-md"
    >
      <div className="border-b border-[#F1F5F9] pb-5">
        <p className="section-label">Your reservation</p>
        <h2 className="mt-1 text-xl font-bold text-[#1A2235]">{roomName}</h2>
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
            className={`${inputCls} ${dateError ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
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
            className={`${inputCls} ${dateError ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
          />
        </label>
      </div>
      {dateError && <p className="mt-1 text-xs font-medium text-red-500">{dateError}</p>}

      {/* Unavailable periods */}
      {blockedRanges.length > 0 && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
            <CalendarX size={12} />
            Unavailable dates
          </p>
          <div className="space-y-1.5">
            {blockedRanges.map(({ from, to }, i) => {
              const nights = Math.round(
                (new Date(to).getTime() - new Date(from).getTime()) / 86_400_000,
              );
              const fmt = (iso: string) =>
                new Date(iso).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              return (
                <div key={i} className="flex flex-wrap items-center gap-1 text-xs text-rose-700">
                  <span className="font-semibold">{fmt(from)}</span>
                  <span className="text-rose-400">→</span>
                  <span className="font-semibold">{fmt(to)}</span>
                  <span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                    {nights}n
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
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
          className={`${inputCls} resize-none`}
          placeholder="Airport transfer, early check-in, dietary notes..."
        />
      </label>

      {/* Price summary */}
      {nights > 0 && (
        <div className="rounded-xl border border-[#DBEAFE] bg-[#EEF4FF] p-4 text-sm">
          <div className="flex justify-between text-[#475569]">
            <span>Rate</span>
            <span>₹{pricePerNight.toLocaleString("en-IN")}/night</span>
          </div>
          <div className="mt-1 flex justify-between text-[#475569]">
            <span>Nights</span>
            <span>{nights}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-[#DBEAFE] pt-3 font-bold text-[#1A2235]">
            <span>Total</span>
            <span className="text-[#0057D9]">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#FF6B35] px-5 py-3.5 font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24] hover:shadow-[0_6px_28px_rgba(255,107,53,0.45)] disabled:opacity-60"
      >
        {loading ? "Processing..." : nights > 0 ? `Confirm · ₹${total.toLocaleString("en-IN")}` : "Confirm booking"}
      </button>

      <p className="text-center text-xs text-[#9CA3AF]">Free cancellation within 24 hours of booking</p>
    </form>
  );
}
