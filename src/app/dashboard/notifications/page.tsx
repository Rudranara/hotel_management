import {
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  CalendarCheck,
  BedDouble,
  Info,
} from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notifications | Huts4u",
  description: "Your booking alerts and activity updates.",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type NotifKind =
  | "booking_confirmed"
  | "booking_pending"
  | "booking_cancelled"
  | "checkin_soon"
  | "checkout_soon"
  | "payment_received"
  | "booking_completed";

interface Notif {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  ts: Date;
  read: boolean;
}

// ── Config ────────────────────────────────────────────────────────────────────

const KIND_META: Record<
  NotifKind,
  { icon: React.ElementType; bg: string; iconColor: string; label: string }
> = {
  booking_confirmed:  { icon: CheckCircle2,  bg: "bg-emerald-50",  iconColor: "text-emerald-500", label: "Booking confirmed"  },
  booking_pending:    { icon: Clock,          bg: "bg-amber-50",    iconColor: "text-amber-500",   label: "Awaiting payment"   },
  booking_cancelled:  { icon: XCircle,        bg: "bg-rose-50",     iconColor: "text-rose-500",    label: "Booking cancelled"  },
  checkin_soon:       { icon: CalendarCheck,  bg: "bg-[#E0FAFA]",   iconColor: "text-[#22C7C7]",   label: "Check-in reminder"  },
  checkout_soon:      { icon: BedDouble,      bg: "bg-violet-50",   iconColor: "text-violet-500",  label: "Check-out reminder" },
  payment_received:   { icon: CreditCard,     bg: "bg-blue-50",     iconColor: "text-blue-500",    label: "Payment received"   },
  booking_completed:  { icon: CheckCircle2,   bg: "bg-[#E0FAFA]",   iconColor: "text-[#22C7C7]",   label: "Stay completed"     },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins < 1)    return "Just now";
  if (mins < 60)   return `${mins}m ago`;
  if (hours < 24)  return `${hours}h ago`;
  if (days < 30)   return `${days}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function futureDiff(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / 86_400_000);
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function NotificationsPage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  const now = new Date();
  const notifs: Notif[] = [];

  for (const b of bookings) {
    const room = b.room as { name?: string } | null;
    const roomName = room?.name ?? "your room";
    const bNum = b.bookingNumber;
    const checkIn  = new Date(b.checkIn);
    const checkOut = new Date(b.checkOut);

    // Booking status events
    if (b.status === "confirmed") {
      notifs.push({
        id: `${bNum}-confirmed`,
        kind: "booking_confirmed",
        title: "Booking confirmed",
        body: `${roomName} · #${bNum} is confirmed for ${checkIn.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}.`,
        ts: b.createdAt ? new Date(b.createdAt) : checkIn,
        read: true,
      });

      if (b.razorpayPaymentId) {
        notifs.push({
          id: `${bNum}-payment`,
          kind: "payment_received",
          title: "Payment received",
          body: `Payment of ₹${b.totalPrice.toLocaleString("en-IN")} confirmed for ${roomName} (#${bNum}).`,
          ts: b.createdAt ? new Date(b.createdAt) : checkIn,
          read: true,
        });
      }

      // Check-in reminder: within 3 days
      const daysToCheckIn = futureDiff(checkIn);
      if (daysToCheckIn >= 0 && daysToCheckIn <= 3) {
        notifs.push({
          id: `${bNum}-checkin`,
          kind: "checkin_soon",
          title: daysToCheckIn === 0 ? "Check-in today!" : `Check-in in ${daysToCheckIn} day${daysToCheckIn === 1 ? "" : "s"}`,
          body: `Your stay at ${roomName} begins ${daysToCheckIn === 0 ? "today" : `on ${checkIn.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}`}.`,
          ts: new Date(checkIn.getTime() - 3 * 86_400_000),
          read: false,
        });
      }

      // Check-out reminder: within 1 day
      const daysToCheckOut = futureDiff(checkOut);
      if (daysToCheckOut >= 0 && daysToCheckOut <= 1) {
        notifs.push({
          id: `${bNum}-checkout`,
          kind: "checkout_soon",
          title: daysToCheckOut === 0 ? "Check-out today" : "Check-out tomorrow",
          body: `Please check out of ${roomName} by 11:00 AM ${daysToCheckOut === 0 ? "today" : "tomorrow"}.`,
          ts: new Date(checkOut.getTime() - 86_400_000),
          read: false,
        });
      }
    }

    if (b.status === "pending") {
      notifs.push({
        id: `${bNum}-pending`,
        kind: "booking_pending",
        title: "Payment pending",
        body: `Complete payment for ${roomName} (#${bNum}) to secure your booking.`,
        ts: b.createdAt ? new Date(b.createdAt) : now,
        read: false,
      });
    }

    if (b.status === "cancelled") {
      notifs.push({
        id: `${bNum}-cancelled`,
        kind: "booking_cancelled",
        title: "Booking cancelled",
        body: `Your booking for ${roomName} (#${bNum}) has been cancelled.`,
        ts: b.updatedAt ? new Date(b.updatedAt) : checkIn,
        read: true,
      });
    }

    if (b.status === "completed") {
      notifs.push({
        id: `${bNum}-completed`,
        kind: "booking_completed",
        title: "Stay completed",
        body: `We hope you enjoyed your stay at ${roomName}. Leave a review to help others!`,
        ts: checkOut,
        read: true,
      });
    }
  }

  // Most recent first
  notifs.sort((a, b) => b.ts.getTime() - a.ts.getTime());

  const unreadCount = notifs.filter((n) => !n.read).length;
  const unread = notifs.filter((n) => !n.read);
  const earlier = notifs.filter((n) => n.read);

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Activity</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">Notifications</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Booking updates and stay reminders</p>
        </div>
        {unreadCount > 0 && (
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#22C7C7]/10 px-4 py-2 text-sm font-semibold text-[#22C7C7] sm:self-auto">
            <Bell className="h-4 w-4" />
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* ── Empty state ── */}
      {notifs.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#D1FAF8] bg-[#F0FFFE] px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22C7C7]/10">
            <Bell className="h-7 w-7 text-[#22C7C7]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#374151]">No notifications yet</p>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              Booking confirmations, reminders and payment receipts will appear here.
            </p>
          </div>
        </div>
      )}

      {/* ── Unread ── */}
      {unread.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">New</h2>
          <div className="space-y-3">
            {unread.map((n) => <NotifRow key={n.id} n={n} />)}
          </div>
        </section>
      )}

      {/* ── Earlier ── */}
      {earlier.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280]">Earlier</h2>
          <div className="space-y-3">
            {earlier.map((n) => <NotifRow key={n.id} n={n} />)}
          </div>
        </section>
      )}

      {/* ── Info notice ── */}
      {notifs.length > 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
          <p className="text-xs text-[#6B7280]">
            Notifications are generated from your booking activity. Email notifications are sent to{" "}
            <span className="font-semibold text-[#374151]">{user.email}</span>.
          </p>
        </div>
      )}

    </div>
  );
}

// ── Row component ─────────────────────────────────────────────────────────────

import type React from "react";

function NotifRow({ n }: { n: Notif }) {
  const meta = KIND_META[n.kind];
  const Icon = meta.icon;

  return (
    <div
      className={`relative flex items-start gap-4 rounded-2xl border px-5 py-4 shadow-sm transition ${
        n.read
          ? "border-[#E5E7EB] bg-white"
          : "border-[#B2F0F0] bg-[#F0FFFE]"
      }`}
    >
      {/* Unread dot */}
      {!n.read && (
        <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#22C7C7]" />
      )}

      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}>
        <Icon className={`h-5 w-5 ${meta.iconColor}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-[#111827]">{n.title}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${meta.bg} ${meta.iconColor}`}>
            {meta.label}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-[#6B7280]">{n.body}</p>
        <p className="mt-1.5 text-xs text-[#9CA3AF]">{relativeTime(n.ts)}</p>
      </div>
    </div>
  );
}