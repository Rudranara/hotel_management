import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, CalendarDays, CheckCircle2, MapPin, Users, XCircle } from "lucide-react";
import type { Metadata } from "next";

import { requireAuth, getBookingById } from "@/lib/dal";
import { formatCurrency } from "@/utils/format";
import { formatDate, diffInNights } from "@/utils/date";
import { isRazorpayConfigured } from "@/lib/env";
import { CouponSection } from "@/components/forms/coupon-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking Confirmed | Huts4u",
};

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const user = await requireAuth();
  const { id } = await params;
  const { payment } = await searchParams;

  const booking = await getBookingById(id, String(user._id));
  if (!booking) notFound();

  const room = booking.room as {
    name?: string;
    type?: string;
    location?: string;
    images?: string[];
    price?: number;
  } | null;

  const nights = diffInNights(booking.checkIn, booking.checkOut);
  const isPending = booking.status === "pending";
  const paymentReady = isRazorpayConfigured();

  const statusColors: Record<string, string> = {
    pending:   "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    active:    "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-slate-50 text-slate-600 border-slate-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">

        {/* Payment result banners */}
        {payment === "success" && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-800">Payment successful!</p>
              <p className="text-sm text-emerald-700">Your booking is now confirmed. See you soon!</p>
            </div>
          </div>
        )}
        {payment === "cancelled" && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="font-bold text-amber-800">Payment not completed</p>
              <p className="text-sm text-amber-700">Your booking is reserved but unpaid. Complete payment to confirm your stay.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 text-center">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
            payment === "success" || booking.status === "confirmed"
              ? "bg-emerald-100"
              : "bg-[#EEF4FF]"
          }`}>
            <CheckCircle2 className={`h-8 w-8 ${
              payment === "success" || booking.status === "confirmed"
                ? "text-emerald-600"
                : "text-[#0057D9]"
            }`} />
          </div>
          <p className="section-label justify-center">
            {booking.status === "confirmed" ? "Booking confirmed" : "Reservation received"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#1A2235]">
            {booking.status === "confirmed" ? "You're all set!" : "You're booked!"}
          </h1>
          <p className="mt-2 text-[#64748B]">
            {booking.status === "confirmed"
              ? "Your reservation is fully confirmed. We look forward to welcoming you."
              : "Your reservation has been received. Complete payment below to confirm your stay."}
          </p>
        </div>

        {/* Booking card */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-md">
          {room?.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={room.images[0]} alt={room.name ?? "Room"} className="h-48 w-full object-cover" />
          )}

          <div className="space-y-5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-label">Booking reference</p>
                <p className="mt-1 font-mono text-xl font-bold text-[#1A2235]">{booking.bookingNumber}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusColors[booking.status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
                {booking.status}
              </span>
            </div>

            <div className="space-y-3 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-4 text-sm">
              <div className="flex items-center gap-3 text-[#1A2235]">
                <MapPin className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <span className="font-semibold">{room?.name ?? "Room"}</span>
                {room?.type && <span className="text-[#9CA3AF]">· {room.type}</span>}
              </div>
              {room?.location && (
                <div className="flex items-center gap-3 text-[#64748B]">
                  <MapPin className="h-4 w-4 shrink-0 opacity-0" />
                  {room.location}
                </div>
              )}
              <div className="flex items-center gap-3 text-[#1A2235]">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <span>{formatDate(booking.checkIn)}</span>
                <span className="text-[#D1D5DB]">→</span>
                <span>{formatDate(booking.checkOut)}</span>
                <span className="text-[#9CA3AF]">({nights} night{nights !== 1 ? "s" : ""})</span>
              </div>
              <div className="flex items-center gap-3 text-[#1A2235]">
                <Users className="h-4 w-4 shrink-0 text-[#0057D9]" />
                {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Total amount */}
            <div className="flex items-center justify-between rounded-xl border border-[#DBEAFE] bg-[#EEF4FF] px-4 py-3">
              <span className="text-sm font-medium text-[#475569]">Total amount</span>
              <span className="text-xl font-bold text-[#0057D9]">{formatCurrency(booking.totalPrice)}</span>
            </div>

            {booking.specialRequests && (
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3">
                <p className="text-xs font-medium text-[#9CA3AF]">Special requests</p>
                <p className="mt-1 text-sm text-[#475569]">{booking.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment section */}
        {isPending && payment !== "success" && (
          <div className="mt-6">
            {paymentReady ? (
              <CouponSection bookingId={id} totalPrice={booking.totalPrice} />
            ) : (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-amber-800">Payment not configured</p>
                  <p className="text-xs text-amber-700">
                    Add <code className="rounded bg-amber-100 px-1 font-mono">RAZORPAY_KEY_ID</code> and{" "}
                    <code className="rounded bg-amber-100 px-1 font-mono">RAZORPAY_KEY_SECRET</code>{" "}
                    to <code className="rounded bg-amber-100 px-1 font-mono">.env.local</code> to enable payments.
                    Your booking is reserved.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/bookings"
            className="flex-1 rounded-full bg-[#FF6B35] py-3 text-center text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
          >
            View all bookings
          </Link>
          <Link
            href="/rooms"
            className="flex-1 rounded-full border border-[#E5E7EB] bg-white py-3 text-center text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:shadow-sm"
          >
            Explore more rooms
          </Link>
        </div>

      </div>
    </div>
  );
}
