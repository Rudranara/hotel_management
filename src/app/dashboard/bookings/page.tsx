import Link from "next/link";
import { BedDouble } from "lucide-react";

import { requireAuth, getDashboardData, getUserReviewedRoomIds } from "@/lib/dal";
import { isRazorpayConfigured } from "@/lib/env";
import { BookingsView, type SerializedBooking } from "@/components/dashboard/bookings-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Bookings | Huts4u",
};

export default async function DashboardBookingsPage() {
  const user = await requireAuth();
  const [{ bookings }, reviewedRoomIds] = await Promise.all([
    getDashboardData(String(user._id)),
    getUserReviewedRoomIds(String(user._id)),
  ]);
  const razorpayReady = isRazorpayConfigured();

  const serialized = JSON.parse(JSON.stringify(bookings)) as SerializedBooking[];

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Guest history</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Your bookings</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {serialized.length} reservation{serialized.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/rooms"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] sm:self-auto"
        >
          <BedDouble className="h-4 w-4" />
          Browse rooms
        </Link>
      </div>

      {/* ── Interactive bookings view ───────────────────────── */}
      <BookingsView
        bookings={serialized}
        reviewedRoomIds={[...reviewedRoomIds]}
        razorpayReady={razorpayReady}
      />
    </div>
  );
}
