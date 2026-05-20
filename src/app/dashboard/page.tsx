import { requireAuth, getDashboardData } from "@/lib/dal";

import { BookingCard } from "@/components/booking-card";
import { EmptyState } from "@/components/empty-state";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireAuth();
  const { bookings, reviews } = await getDashboardData(String(user._id));

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Dashboard</p>
        <h1 className="mt-3 font-serif text-5xl text-white">Welcome back, {user.name}</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/70">
          Track active stays, revisit your booking history, and keep your traveler profile polished in one place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total bookings", value: bookings.length },
          { label: "Reviews shared", value: reviews.length },
          { label: "Profile role", value: user.role },
        ].map((item) => (
          <div key={item.label} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-white/60">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold capitalize text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">Recent activity</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Latest bookings</h2>
        </div>
        {bookings.length > 0 ? (
          bookings.slice(0, 3).map((booking) => <BookingCard key={String(booking._id)} booking={booking as never} />)
        ) : (
          <EmptyState
            title="No bookings yet"
            description="Your confirmed and pending stays will appear here after you reserve a room."
            href="/rooms"
            cta="Book a room"
          />
        )}
      </section>
    </div>
  );
}
