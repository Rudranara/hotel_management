"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/bookings", label: "Bookings" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/admin", label: "Admin" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
      <div className="mb-4 px-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Workspace</p>
        <p className="mt-2 text-lg font-semibold text-white">Guest Console</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-2xl px-4 py-3 text-sm transition",
                active ? "bg-white text-slate-950 shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
