import { getAdminDashboardData, requireAdmin } from "@/lib/dal";

import { AdminBookingManager } from "@/components/admin/admin-booking-manager";
import { AdminRoomManager } from "@/components/admin/admin-room-manager";
import { AdminUserManager } from "@/components/admin/admin-user-manager";
import { AdminAnalytics } from "@/components/admin/admin-analytics";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin | Huts4u" };

export default async function AdminPage() {
  const user = await requireAdmin();
  const { rooms, bookings, users, revenueByDay = [], upcomingCheckIns = [] } = await getAdminDashboardData();

  const totalRevenue = (revenueByDay as { revenue: number }[]).reduce((s, d) => s + d.revenue, 0);
  const activeBookings = bookings.filter((b) => ["confirmed", "active"].includes((b as { status: string }).status));
  const occupancyRate = rooms.length > 0 ? Math.round((activeBookings.length / rooms.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Admin cockpit</p>
        <h1 className="mt-3 font-serif text-4xl text-[#111827]">Control operations, {user.name}</h1>
        <p className="mt-4 max-w-3xl text-base text-[#6B7280]">
          Manage room inventory, user permissions, and booking lifecycles from a single polished dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Rooms", value: rooms.length },
          { label: "Bookings", value: bookings.length },
          { label: "Users", value: users.length },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#9CA3AF]">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold text-[#111827]">{item.value}</p>
          </div>
        ))}
      </div>

      <AdminAnalytics
        revenueByDay={revenueByDay as { _id: string; revenue: number; count: number }[]}
        upcomingCheckIns={upcomingCheckIns as never}
        totalRevenue={totalRevenue}
        occupancyRate={occupancyRate}
      />

      <div className="space-y-8">
        <AdminRoomManager rooms={rooms.map((room) => ({ ...room, _id: String(room._id) }))} />
        <AdminBookingManager bookings={bookings.map((booking) => ({ ...booking, _id: String(booking._id) })) as never} />
        <AdminUserManager users={users.map((entry) => ({ ...entry, _id: String(entry._id) })) as never} />
      </div>
    </div>
  );
}
