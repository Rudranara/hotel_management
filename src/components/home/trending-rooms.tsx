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
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
        <div>
          <p className="section-label">Trending Rooms</p>
          <h2 className="section-title mt-3 max-w-lg">Luxury rooms guests are booking right now</h2>
        </div>
        <Link
          href="/rooms"
          className="shrink-0 text-sm font-semibold text-[#0057D9] transition hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.name} room={room} href={room.slug ? `/rooms/${room.slug}` : undefined} />
        ))}
      </div>
      </div>
    </section>
  );
}
