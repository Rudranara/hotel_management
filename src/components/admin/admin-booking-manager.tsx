"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, User, BedDouble, ChevronLeft, ChevronRight, Check, X, CheckCircle2 } from "lucide-react";

import { apiRequest } from "@/api/client";

interface AdminBooking {
  _id: string;
  bookingNumber: string;
  status: string;
  checkIn?: string | Date;
  checkOut?: string | Date;
  totalPrice?: number;
  guests?: number;
  user?: { name?: string; email?: string };
  room?: { name?: string; type?: string };
}

const PAGE_SIZE = 10;

const STATUS_CONFIG: Record<string, { label: string; badge: string; border: string }> = {
  pending:   { label: "Pending",   badge: "bg-amber-50 text-amber-700 border-amber-200",       border: "border-l-amber-400" },
  confirmed: { label: "Confirmed", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", border: "border-l-emerald-400" },
  cancelled: { label: "Cancelled", badge: "bg-red-50 text-red-600 border-red-200",             border: "border-l-red-400" },
  completed: { label: "Completed", badge: "bg-slate-100 text-slate-600 border-slate-200",      border: "border-l-slate-300" },
};

function fmtDate(d?: string | Date) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
}

function fmtINR(n?: number) {
  if (!n) return null;
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export function AdminBookingManager({ bookings }: { bookings: AdminBooking[] }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const paginated = bookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function updateStatus(id: string, status: string) {
    setLoadingId(id);
    try {
      await apiRequest(`/api/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success("Booking updated.");
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status update failed.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="border-b border-[#E5E7EB] px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Operations</p>
        <h2 className="mt-1.5 text-2xl font-semibold text-[#111827]">Manage bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="px-6 py-12 text-center text-[#9CA3AF]">No bookings yet.</div>
      ) : (
        <>
          <div className="divide-y divide-[#F1F5F9]">
            {paginated.map((booking) => {
              const cfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;
              return (
                <div
                  key={booking._id}
                  className={`flex flex-col gap-4 border-l-4 px-6 py-5 transition hover:bg-[#F8FAFC] lg:flex-row lg:items-center ${cfg.border}`}
                >
                  {/* Booking ref + room + guest */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-[#111827]">
                        {booking.bookingNumber}
                      </span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#6B7280]">
                      {booking.room?.name && (
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="h-3.5 w-3.5 shrink-0 text-[#22C7C7]" />
                          {booking.room.name}
                          {booking.room.type && <span className="text-[#9CA3AF]">· {booking.room.type}</span>}
                        </span>
                      )}
                      {booking.user?.name && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 shrink-0 text-[#22C7C7]" />
                          {booking.user.name}
                          {booking.user.email && <span className="text-[#9CA3AF]">· {booking.user.email}</span>}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dates + price */}
                  <div className="flex shrink-0 flex-col gap-1 text-sm lg:items-end">
                    {(booking.checkIn || booking.checkOut) && (
                      <span className="flex items-center gap-1.5 text-[#374151]">
                        <CalendarDays className="h-3.5 w-3.5 text-[#22C7C7]" />
                        {fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}
                      </span>
                    )}
                    {fmtINR(booking.totalPrice) && (
                      <span className="font-semibold text-[#111827]">{fmtINR(booking.totalPrice)}</span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          disabled={loadingId === booking._id}
                          onClick={() => void updateStatus(booking._id, "confirmed")}
                          className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          disabled={loadingId === booking._id}
                          onClick={() => void updateStatus(booking._id, "cancelled")}
                          className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                        >
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <>
                        <button
                          disabled={loadingId === booking._id}
                          onClick={() => void updateStatus(booking._id, "completed")}
                          className="flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1AB5B5] disabled:opacity-60"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Complete
                        </button>
                        <button
                          disabled={loadingId === booking._id}
                          onClick={() => void updateStatus(booking._id, "cancelled")}
                          className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </>
                    )}
                    {(booking.status === "cancelled" || booking.status === "completed") && (
                      <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#E5E7EB] px-6 py-4 text-sm">
              <p className="text-[#9CA3AF]">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, bookings.length)} of {bookings.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F1F5F9] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-[#374151]">{page} / {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F1F5F9] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
