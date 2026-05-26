"use client";

import Link from "next/link";
import { BarChart2, BedDouble, BookOpen, Users, AlertCircle } from "lucide-react";

const NAV = [
  { href: "#analytics", label: "Analytics", icon: BarChart2 },
  { href: "#rooms", label: "Rooms", icon: BedDouble },
  { href: "#bookings", label: "Bookings", icon: BookOpen },
  { href: "#users", label: "Users", icon: Users },
];

export function AdminSidebar({ pendingCount }: { pendingCount: number }) {
  return (
    <aside className="sticky top-24 space-y-2">
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9CA3AF]">
        Quick nav
      </p>

      {NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#374151] transition hover:bg-white hover:text-[#111827] hover:shadow-sm"
        >
          <Icon className="h-4 w-4 shrink-0 text-[#22C7C7]" />
          <span className="flex-1">{label}</span>
          {href === "#bookings" && pendingCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold text-white">
              {pendingCount > 99 ? "99+" : pendingCount}
            </span>
          )}
        </Link>
      ))}

      {pendingCount > 0 && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>
            <strong>{pendingCount}</strong> booking{pendingCount !== 1 ? "s" : ""} awaiting review.
          </p>
        </div>
      )}
    </aside>
  );
}
