import { BedDouble, CalendarDays, TrendingUp, Users } from "lucide-react";

import { getAdminDashboardData, requireAdmin } from "@/lib/dal";
import { formatCurrency } from "@/utils/format";

import { AdminBookingManager } from "@/components/admin/admin-booking-manager";
import { AdminRoomManager } from "@/components/admin/admin-room-manager";
import { AdminUserManager } from "@/components/admin/admin-user-manager";
import { AdminAnalytics } from "@/components/admin/admin-analytics";
import { AdminCouponManager } from "@/components/admin/admin-coupon-manager";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin | Huts4u" };

export default async function AdminPage() {
  const user = await requireAdmin();
  const { rooms, bookings, users, coupons = [], revenueByDay = [], upcomingCheckIns = [] } = await getAdminDashboardData();

  const totalRevenue = (revenueByDay as { revenue: number }[]).reduce((s, d) => s + d.revenue, 0);
  const confirmedBookings = bookings.filter((b) => ["confirmed"].includes((b as { status: string }).status));
  const occupancyRate = rooms.length > 0 ? Math.round((confirmedBookings.length / rooms.length) * 100) : 0;
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const stats = [
    {
      label: "Total Rooms",
      value: rooms.length,
      icon: BedDouble,
      accent: "text-[#22C7C7]",
      bg: "bg-[#22C7C7]/8",
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarDays,
      accent: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      accent: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      label: "30-day Revenue",
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#22C7C7] via-[#1AB5B5] to-[#22C7C7]" />
        <div className="flex items-start justify-between gap-6 px-8 py-7">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Admin cockpit</p>
            <h1 className="mt-2 font-serif text-4xl text-[#111827]">
              Good to see you, <span className="text-[#22C7C7]">{user.name}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#6B7280]">
              Manage room inventory, user permissions, and booking lifecycles in one place.
            </p>
          </div>
          <div className="hidden shrink-0 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4 text-right lg:block">
            <p className="text-xs text-[#9CA3AF]">Today</p>
            <p className="mt-1 text-sm font-medium text-[#374151]">{today}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.accent}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#9CA3AF]">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#111827]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div id="analytics">
        <AdminAnalytics
          revenueByDay={revenueByDay as { _id: string; revenue: number; count: number }[]}
          upcomingCheckIns={upcomingCheckIns as never}
          totalRevenue={totalRevenue}
          occupancyRate={occupancyRate}
        />
      </div>

      <div className="space-y-8">
        <div id="rooms"><AdminRoomManager rooms={rooms.map((room) => ({ ...room, _id: String(room._id) }))} /></div>
        <div id="bookings"><AdminBookingManager bookings={bookings.map((booking) => ({ ...booking, _id: String(booking._id) })) as never} /></div>
        <div id="users"><AdminUserManager users={users.map((entry) => ({ ...entry, _id: String(entry._id) })) as never} /></div>
        <div id="coupons"><AdminCouponManager coupons={coupons.map((c) => ({ ...c, _id: String(c._id) })) as never} /></div>
      </div>
    </div>
  );
}
