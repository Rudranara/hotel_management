import { requireAuth, getDashboardData } from "@/lib/dal";

import { BookingCard } from "@/components/booking-card";
import { EmptyState } from "@/components/empty-state";

export const dynamic = "force-dynamic";

export default async function DashboardBookingsPage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-white/40">Guest history</p>
        <h1 className="mt-3 font-serif text-5xl text-white">Your bookings</h1>
      </div>

      {bookings.length > 0 ? (
        bookings.map((booking) => <BookingCard key={String(booking._id)} booking={booking as never} />)
      ) : (
        <EmptyState
          title="No trips booked yet"
          description="Start with a room that fits your stay style, then your history will build from here."
          href="/rooms"
          cta="Explore rooms"
        />
      )}
    </div>
  );
}
