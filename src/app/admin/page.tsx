import { getAdminDashboardData, requireAdmin } from "@/lib/dal";

import { AdminBookingManager } from "@/components/admin/admin-booking-manager";
import { AdminRoomManager } from "@/components/admin/admin-room-manager";
import { AdminUserManager } from "@/components/admin/admin-user-manager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireAdmin();
  const { rooms, bookings, users } = await getAdminDashboardData();

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Admin cockpit</p>
        <h1 className="mt-3 font-serif text-5xl text-white">Control operations, {user.name}</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/70">
          Manage room inventory, user permissions, and booking lifecycles from a single polished dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Rooms", value: rooms.length },
          { label: "Bookings", value: bookings.length },
          { label: "Users", value: users.length },
        ].map((item) => (
          <div key={item.label} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-white/60">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <AdminRoomManager rooms={rooms.map((room) => ({ ...room, _id: String(room._id) }))} />
        <AdminBookingManager bookings={bookings.map((booking) => ({ ...booking, _id: String(booking._id) })) as never} />
        <AdminUserManager users={users.map((entry) => ({ ...entry, _id: String(entry._id) })) as never} />
      </div>
    </section>
  );
}
