import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

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
  const available = room.availabilityStatus === "available";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {room.type}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              available
                ? "bg-emerald-400/90 text-emerald-950"
                : "bg-red-400/90 text-red-950"
            }`}
          >
            {available ? "Available" : "Booked"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold leading-snug text-white">{room.name}</h3>
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-300/15 px-2.5 py-1 text-xs font-medium text-amber-200">
              <Star size={11} className="fill-amber-300 text-amber-300" />
              {room.rating.toFixed(1)}
            </div>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-white/50">
            <MapPin size={12} />
            {room.location}
          </p>
        </div>

        {/* Amenities */}
        {room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/55"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/35">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between border-t border-white/8 pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Per night</p>
            <p className="mt-0.5 text-2xl font-semibold text-white">{formatCurrency(room.price)}</p>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-100"
          >
            View room
          </Link>
        </div>
      </div>
    </article>
  );
}
