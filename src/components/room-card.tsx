import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/utils/format";

interface RoomCardProps {
  room: {
    _id: string;
    name: string;
    slug: string;
    type: string;
    location: string;
    price: number;
    images: string[];
    availabilityStatus: string;
    rating: number;
    amenities: string[];
  };
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-xl backdrop-blur-xl transition hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-950">
          {room.type}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">{room.name}</h3>
            <p className="mt-1 text-sm text-white/60">{room.location}</p>
          </div>
          <div className="rounded-2xl bg-amber-300/20 px-3 py-2 text-right text-sm text-amber-100">
            <div>{room.rating.toFixed(1)} / 5</div>
            <div className="text-xs uppercase tracking-[0.25em]">Rated</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Starting from</p>
            <p className="text-2xl font-semibold text-white">{formatCurrency(room.price)}</p>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-100"
          >
            View room
          </Link>
        </div>
      </div>
    </article>
  );
}
