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
    <section className="space-y-5 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Operations</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Manage bookings</h2>
      </div>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <article
            key={booking._id}
            className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 lg:grid-cols-[2fr_2fr_1fr]"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{booking.bookingNumber}</h3>
              <p className="text-sm text-white/60">{booking.room?.name ?? "Room"}</p>
            </div>
            <div>
              <p className="text-sm text-white/70">{booking.user?.name ?? "Guest"}</p>
              <p className="text-sm text-white/50">{booking.user?.email ?? ""}</p>
            </div>
            <select
              value={booking.status}
              onChange={(event) => void updateStatus(booking._id, event.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
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
