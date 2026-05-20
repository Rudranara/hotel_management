import { getRooms } from "@/lib/dal";
import { isDatabaseConfigured } from "@/lib/env";

import { RoomFilters } from "@/components/forms/room-filters";
import { SetupNotice } from "@/components/setup-notice";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  if (!isDatabaseConfigured()) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SetupNotice />
      </section>
    );
  }

  const rooms = await getRooms();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Discover stays</p>
        <h1 className="mt-3 font-serif text-5xl text-white">Browse every room in your collection.</h1>
        <p className="mt-4 text-lg text-white/70">
          Search by destination, narrow by room type, and book exceptional hospitality experiences in a few clicks.
        </p>
      </div>

      <RoomFilters rooms={rooms.map((room) => ({ ...room, _id: String(room._id) }))} />
    </section>
  );
}
