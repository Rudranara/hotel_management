"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BedDouble, CalendarDays, CheckCircle2, Clock3, CreditCard, XCircle,
} from "lucide-react";

import { BookingCard } from "@/components/booking-card";
import { CancelBookingButton } from "@/components/forms/cancel-booking-button";
import { ReviewForm } from "@/components/forms/review-form";
import { cn } from "@/utils/cn";

type TabKey = "all" | "upcoming" | "completed" | "cancelled";

export interface SerializedBooking {
  _id: string;
  bookingNumber: string;
  status: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  room: {
    _id?: string;
    name?: string;
    type?: string;
    location?: string;
    images?: string[];
  } | null;
}

interface BookingsViewProps {
  bookings: SerializedBooking[];
  reviewedRoomIds: string[];
  razorpayReady: boolean;
}

const TABS = [
  { key: "all" as TabKey,       label: "All stays",  icon: CalendarDays },
  { key: "upcoming" as TabKey,  label: "Upcoming",   icon: Clock3       },
  { key: "completed" as TabKey, label: "Completed",  icon: CheckCircle2 },
  { key: "cancelled" as TabKey, label: "Cancelled",  icon: XCircle      },
];

const EMPTY_MESSAGES: Record<TabKey, { title: string; desc: string }> = {
  all:       { title: "No bookings yet",         desc: "Your reservations will appear here once you make a booking."    },
  upcoming:  { title: "No upcoming stays",        desc: "You don't have any confirmed or pending reservations right now." },
  completed: { title: "No completed stays yet",   desc: "Completed stays will appear here after your check-out date."    },
  cancelled: { title: "No cancelled bookings",    desc: "You haven't cancelled any bookings — keep it up!"               },
};

export function BookingsView({ bookings, reviewedRoomIds, razorpayReady }: BookingsViewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const now = new Date();
  const reviewedSet = new Set(reviewedRoomIds);

  const counts: Record<TabKey, number> = {
    all:       bookings.length,
    upcoming:  bookings.filter((b) => b.status !== "cancelled" && new Date(b.checkOut) >= now).length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === "all")       return true;
    if (activeTab === "upcoming")  return b.status !== "cancelled" && new Date(b.checkOut) >= now;
    if (activeTab === "completed") return b.status === "completed";
    if (activeTab === "cancelled") return b.status === "cancelled";
    return true;
  });

  const empty = EMPTY_MESSAGES[activeTab];

  return (
    <div className="space-y-5">
      {/* ── Tab filter bar ─────────────────────────────────── */}
      <div className="flex overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white p-1.5 shadow-sm">
        <div className="flex min-w-full gap-1">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap",
                  active
                    ? "bg-[#22C7C7] text-white shadow-sm"
                    : "text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#374151]",
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-none min-w-[1.25rem] text-center",
                    active ? "bg-white/25 text-white" : "bg-[#F1F5F9] text-[#6B7280]",
                  )}
                >
                  {counts[key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Booking list ────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const canReview =
              booking.status === "completed" &&
              booking.room?._id &&
              !reviewedSet.has(booking.room._id);

            return (
              <div key={booking._id} className="space-y-2">
                <BookingCard booking={booking} />

                {(booking.status === "pending" || booking.status === "confirmed") && (
                  <div className="flex flex-wrap items-center justify-end gap-2 px-1 pt-0.5">
                    {booking.status === "pending" && (
                      <Link
                        href={`/booking/confirmation/${booking._id}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        {razorpayReady ? "Complete payment" : "View booking"}
                      </Link>
                    )}
                    <CancelBookingButton bookingId={booking._id} />
                  </div>
                )}

                {(booking.status === "pending" || booking.status === "confirmed") && (
                  <p className="px-1 text-right text-xs text-[#9CA3AF]">
                    Review available after your stay is complete
                  </p>
                )}

                {canReview && booking.room?._id && (
                  <ReviewForm
                    roomId={booking.room._id}
                    roomName={booking.room.name ?? "Room"}
                    bookingId={booking._id}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Per-tab empty state ──────────────────────────── */
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-16 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#22C7C7]/10">
            <BedDouble className="h-7 w-7 text-[#22C7C7]" />
          </div>
          <div className="max-w-xs space-y-1.5">
            <h3 className="text-lg font-semibold text-[#111827]">{empty.title}</h3>
            <p className="text-sm text-[#6B7280]">{empty.desc}</p>
          </div>
          {(activeTab === "all" || activeTab === "upcoming") && (
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
            >
              <BedDouble className="h-4 w-4" />
              Explore rooms
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
