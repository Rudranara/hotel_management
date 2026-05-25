"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

export function AdminBookingManager({
  bookings,
}: {
  bookings: Array<{
    _id: string;
    bookingNumber: string;
    status: string;
    user?: { name?: string; email?: string };
    room?: { name?: string; type?: string };
  }>;
}) {
  const router = useRouter();

  async function updateStatus(id: string, status: string) {
    try {
      await apiRequest(`/api/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success("Booking status updated.");
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status update failed.");
    }
  }

  return (
    <section className="space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Operations</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#111827]">Manage bookings</h2>
      </div>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <article
            key={booking._id}
            className="grid gap-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 lg:grid-cols-[2fr_2fr_1fr]"
          >
            <div>
              <h3 className="text-base font-semibold text-[#111827]">{booking.bookingNumber}</h3>
              <p className="text-sm text-[#6B7280]">{booking.room?.name ?? "Room"}</p>
            </div>
            <div>
              <p className="text-sm text-[#374151]">{booking.user?.name ?? "Guest"}</p>
              <p className="text-sm text-[#9CA3AF]">{booking.user?.email ?? ""}</p>
            </div>
            <select
              value={booking.status}
              onChange={(event) => void updateStatus(booking._id, event.target.value)}
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}
