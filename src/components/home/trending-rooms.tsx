import Link from "next/link";
import { RoomCard } from "@/components/home/room-card";

type Room = {
  image: string;
  name: string;
  slug?: string;
  location: string;
  rating: string;
  price: string;
  oldPrice: string;
  meta: string;
};

export function TrendingRooms({ rooms }: { rooms: Room[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="mb-6 flex items-center justify-between gap-4 md:mb-8 lg:mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Trending rooms</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl lg:text-4xl xl:text-5xl">Luxury rooms guests are booking right now</h2>
        </div>
        <Link
          href="/rooms"
          className="shrink-0 text-sm font-medium uppercase tracking-[0.22em] text-[#111827] transition hover:text-[#22C7C7] lg:text-base"
        >
          View All
        </Link>
      </div>

      {/* Single column on mobile, 2-col on sm, 3-col on desktop */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.name} room={room} href={room.slug ? `/rooms/${room.slug}` : undefined} />
        ))}
      </div>
    </section>
  );
}
