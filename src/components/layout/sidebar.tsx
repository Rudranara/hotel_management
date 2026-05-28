"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, UserCircle, Heart, Wallet,
  Gift, Bell, CreditCard, HelpCircle, LogOut, Map, Bookmark,
} from "lucide-react";

import { cn } from "@/utils/cn";

const items = [
  { group: "Main",
    links: [
      { href: "/dashboard",            label: "Dashboard",        icon: LayoutDashboard },
      { href: "/dashboard/bookings",   label: "My Bookings",      icon: BookOpen        },
      { href: "/dashboard/saved-trips", label: "Saved Trips",      icon: Map             },
      { href: "/dashboard/wishlist",   label: "Wishlist",         icon: Heart           },
    ],
  },
  { group: "Finance",
    links: [
      { href: "/dashboard/wallet",     label: "Travel Wallet",    icon: Wallet          },
      { href: "/dashboard/rewards",      label: "Rewards",          icon: Gift            },
      { href: "/dashboard/payment-methods", label: "Payment Methods",  icon: CreditCard      },
    ],
  },
  { group: "Account",
    links: [
      { href: "/dashboard/notifications", label: "Notifications",    icon: Bell            },
      { href: "/dashboard/profile",    label: "Profile Settings", icon: UserCircle      },
      { href: "/support",              label: "Support Center",   icon: HelpCircle      },
      { href: "/logout",              label: "Logout",            icon: LogOut          },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="self-start sticky top-24 w-full rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      {/* Profile mini */}
      <div className="flex items-center gap-3 border-b border-[#F1F5F9] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057D9] text-sm font-bold text-white">G</div>
        <div>
          <p className="text-sm font-semibold text-[#1A2235]">Guest User</p>
          <p className="text-xs text-[#6B7280]">guest@huts4u.com</p>
        </div>
      </div>

      <div className="p-3">
        {items.map((group) => (
          <div key={group.group} className="mb-4">
            <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9CA3AF]">{group.group}</p>
            <div className="space-y-0.5">
              {group.links.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                const isLogout = item.label === "Logout";
                if (isLogout) {
                  return (
                    <button
                      key={item.href}
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition text-[#EF4444] hover:bg-[#FEF2F2] disabled:opacity-60"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {loggingOut ? "Signing out…" : item.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      active
                        ? "bg-[#EEF4FF] text-[#0057D9]"
                        : "text-[#6B7280] hover:bg-[#F7F9FC] hover:text-[#1A2235]",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                    {item.label === "Notifications" && (
                      <span className="ml-auto rounded-full bg-[#FF6B35] px-1.5 py-0.5 text-[10px] font-bold text-white">3</span>
                    )}
                    {item.label === "Rewards" && (
                      <span className="ml-auto rounded-full bg-[#22C55E] px-1.5 py-0.5 text-[10px] font-bold text-white">2,450 pts</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Promo card */}
      <div className="mx-3 mb-3 rounded-xl bg-gradient-to-br from-[#0057D9] to-[#1E40AF] p-4 text-white">
        <Bookmark className="h-5 w-5 text-white/70" />
        <p className="mt-2 text-xs font-bold">Earn 500 bonus points</p>
        <p className="mt-0.5 text-[10px] text-white/60">Complete your profile to unlock rewards</p>
        <button className="mt-3 w-full rounded-lg bg-white/15 py-1.5 text-[11px] font-semibold transition hover:bg-white/25">Complete Now</button>
      </div>
    </aside>
  );
}

