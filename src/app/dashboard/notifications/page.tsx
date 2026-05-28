import Link from "next/link";
import {
  Bell,
  BedDouble,
  ArrowRight,
  CheckCircle2,
  Tag,
  Gift,
  CreditCard,
  ShieldCheck,
  Info,
  MessageSquare,
  Star,
  Zap,
  Settings,
  Trash2,
  CheckCheck,
} from "lucide-react";

import { requireAuth } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notifications | Huts4u",
  description: "Stay up to date with your bookings, offers, and account activity.",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type NotifCategory = "booking" | "offer" | "payment" | "review" | "account" | "system";

interface Notification {
  id: string;
  category: NotifCategory;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

// ── Static placeholder data ───────────────────────────────────────────────────

const notifications: Notification[] = [
  { id: "N01", category: "booking",  title: "Booking confirmed",              body: "Your booking for Sea Breeze Suite (Jun 12–14) is confirmed. Check-in at 2 PM.",                 date: "Today, 10:24 AM",   read: false },
  { id: "N02", category: "offer",    title: "Flash deal — 30% off Goa stays", body: "Book any Goa property before midnight tonight and save 30%. Use code GOAFLASH.",               date: "Today, 08:00 AM",   read: false },
  { id: "N03", category: "payment",  title: "Payment received — ₹3,700",      body: "Your payment of ₹3,700 for booking #BK-20240 was processed successfully.",                       date: "Yesterday, 6:15 PM", read: false },
  { id: "N04", category: "review",   title: "Leave a review",                  body: "You stayed at Lagoon Villa last week. Share your experience and earn 50 bonus reward points.",   date: "May 25, 2026",      read: true  },
  { id: "N05", category: "account",  title: "Profile 80% complete",            body: "Add your date of birth to complete your profile and unlock an extra 100 reward points.",         date: "May 24, 2026",      read: true  },
  { id: "N06", category: "booking",  title: "Upcoming check-in reminder",      body: "You check in to Skyline Premier Room tomorrow. Don't forget your booking ID: BK-19987.",        date: "May 22, 2026",      read: true  },
  { id: "N07", category: "offer",    title: "Exclusive members deal",          body: "As a Silver member you get early access to summer deals. Browse now before they sell out.",      date: "May 20, 2026",      read: true  },
  { id: "N08", category: "payment",  title: "Cashback of ₹850 credited",       body: "Your cashback for the Lagoon Villa booking has been credited to your Travel Wallet.",           date: "May 18, 2026",      read: true  },
  { id: "N09", category: "system",   title: "App update available",            body: "Version 3.2 brings faster checkout, improved search, and dark mode. Update now.",               date: "May 17, 2026",      read: true  },
  { id: "N10", category: "review",   title: "Your review was published",       body: "Your 5-star review for Heritage Haveli is now live and has helped 12 other travellers.",        date: "May 15, 2026",      read: true  },
];

const categoryMeta: Record<NotifCategory, { icon: React.ElementType; bg: string; ico: string; label: string }> = {
  booking:  { icon: BedDouble,     bg: "bg-[#22C7C7]/10", ico: "text-[#22C7C7]",  label: "Booking"  },
  offer:    { icon: Tag,           bg: "bg-amber-50",      ico: "text-amber-500",  label: "Offer"    },
  payment:  { icon: CreditCard,    bg: "bg-emerald-50",    ico: "text-emerald-500",label: "Payment"  },
  review:   { icon: Star,          bg: "bg-violet-50",     ico: "text-violet-500", label: "Review"   },
  account:  { icon: ShieldCheck,   bg: "bg-blue-50",       ico: "text-blue-500",   label: "Account"  },
  system:   { icon: Info,          bg: "bg-slate-50",      ico: "text-slate-500",  label: "System"   },
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function NotificationsPage() {
  await requireAuth();

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Activity</p>
          <h1 className="mt-1.5 text-3xl font-bold text-[#111827] md:text-4xl">
            Notifications
            {unread > 0 && (
              <span className="ml-3 inline-flex items-center rounded-full bg-[#22C7C7] px-2.5 py-0.5 text-sm font-bold text-white">
                {unread} new
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">Stay on top of your bookings, deals, and account updates</p>
        </div>
        <div className="flex shrink-0 gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#374151] transition hover:border-[#22C7C7] hover:text-[#22C7C7]">
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#22C7C7] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
          >
            <Settings className="h-4 w-4" /> Preferences
          </Link>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { icon: Bell,          label: "Total",        value: notifications.length,                                     bg: "bg-[#22C7C7]/10", ico: "text-[#22C7C7]"  },
          { icon: Zap,           label: "Unread",       value: unread,                                                   bg: "bg-amber-50",     ico: "text-amber-500"  },
          { icon: CheckCircle2,  label: "Read",         value: notifications.length - unread,                            bg: "bg-emerald-50",   ico: "text-emerald-500"},
          { icon: MessageSquare, label: "Categories",   value: Object.keys(categoryMeta).length,                         bg: "bg-violet-50",    ico: "text-violet-500" },
        ].map(({ icon: Icon, label, value, bg, ico }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg}`}>
              <Icon className={`h-5 w-5 ${ico}`} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#111827]">{value}</p>
              <p className="text-xs font-semibold text-[#6B7280]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Notification list ── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        {/* Card header */}
        <div className="flex items-center justify-between border-b border-[#F1F5F9] px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Inbox</p>
            <h2 className="mt-0.5 text-lg font-bold text-[#111827]">All Notifications</h2>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 transition hover:text-rose-600">
            <Trash2 className="h-3.5 w-3.5" /> Clear all
          </button>
        </div>

        {/* Items */}
        <div className="divide-y divide-[#F1F5F9]">
          {notifications.map((n) => {
            const meta = categoryMeta[n.category];
            const Icon = meta.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-6 py-4 transition hover:bg-[#F8FAFC] ${!n.read ? "bg-[#F0FFFE]" : ""}`}
              >
                {/* Icon */}
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}>
                  <Icon className={`h-4.5 w-4.5 ${meta.ico}`} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={`text-sm font-semibold text-[#111827] ${!n.read ? "font-bold" : ""}`}>
                      {n.title}
                    </p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.bg} ${meta.ico}`}>
                      {meta.label}
                    </span>
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-[#22C7C7]" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-[#6B7280]">{n.body}</p>
                  <p className="mt-1 text-xs text-[#9CA3AF]">{n.date}</p>
                </div>

                {/* Dismiss */}
                <button className="mt-1 shrink-0 text-[#D1D5DB] transition hover:text-rose-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-[#F1F5F9] px-6 py-4">
          <button className="text-sm font-semibold text-[#22C7C7] transition hover:underline">
            Load more notifications
          </button>
        </div>
      </div>

      {/* ── Notification preferences ── */}
      <div>
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Settings</p>
          <h2 className="mt-0.5 text-lg font-bold text-[#111827]">Notification Preferences</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              { icon: BedDouble,  label: "Booking updates",    desc: "Confirmations, reminders, and cancellations",  enabled: true  },
              { icon: Tag,        label: "Deals & offers",      desc: "Flash sales, member exclusives, promo codes",  enabled: true  },
              { icon: CreditCard, label: "Payment alerts",      desc: "Payment confirmations and cashback credits",   enabled: true  },
              { icon: Star,       label: "Review prompts",      desc: "Reminders to review your recent stays",        enabled: false },
              { icon: ShieldCheck,label: "Account activity",    desc: "Profile changes, login alerts, security",      enabled: true  },
              { icon: Info,       label: "Product updates",     desc: "New features, app updates, announcements",     enabled: false },
            ] as { icon: React.ElementType; label: string; desc: string; enabled: boolean }[]
          ).map(({ icon: Icon, label, desc, enabled }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#22C7C7]/10">
                <Icon className="h-5 w-5 text-[#22C7C7]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#111827]">{label}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">{desc}</p>
              </div>
              {/* Toggle pill */}
              <div className={`mt-0.5 flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full px-0.5 transition-colors ${enabled ? "bg-[#22C7C7]" : "bg-[#E5E7EB]"}`}>
                <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22C7C7] via-[#1DDCDC] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#22C7C7]">Never miss a deal</p>
            <h2 className="mt-1 text-xl font-bold text-[#111827]">Turn on deal alerts</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              Enable deal notifications and be the first to know about flash sales and exclusive member offers.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5]"
            >
              <Tag className="h-4 w-4" /> Browse deals
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] transition hover:border-[#22C7C7] hover:text-[#22C7C7]"
            >
              Browse rooms <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
