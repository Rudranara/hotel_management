"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, UserCircle } from "lucide-react";

import { cn } from "@/utils/cn";

const items = [
  { href: "/dashboard",          label: "Overview",  icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Bookings",  icon: BookOpen        },
  { href: "/dashboard/profile",  label: "Profile",   icon: UserCircle      },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm self-start sticky top-24">
      <div className="mb-5 px-3">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#9CA3AF]">Workspace</p>
        <p className="mt-1.5 text-base font-semibold text-[#111827]">Guest Console</p>
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-[#22C7C7]/10 text-[#22C7C7]"
                  : "text-[#6B7280] hover:bg-[#F1F5F9] hover:text-[#111827]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
