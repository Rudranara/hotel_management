import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";

import { formatCurrency } from "@/utils/format";
import { WishlistButton } from "@/components/wishlist-button";

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
    reviewCount?: number;
    amenities: string[];
    capacity?: number;
  };
  isSaved?: boolean;
}

export function RoomCard({ room, isSaved = false }: RoomCardProps) {
  const available = room.availabilityStatus === "available";

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#DBEAFE] hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-[#0057D9] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {room.type}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
              available
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {available ? "Available" : "Booked"}
          </span>
        </div>

        {/* Wishlist button */}
        <div className="absolute right-3 top-3">
          <WishlistButton roomId={room._id} initialSaved={isSaved} />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-snug text-[#1A2235] transition group-hover:text-[#0057D9]">{room.name}</h3>
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {room.rating.toFixed(1)}
              {room.reviewCount != null && room.reviewCount > 0 && (
                <span className="font-normal text-amber-500/80">({room.reviewCount})</span>
              )}
            </div>
          </div>
          <p className="mt-1 flex items-center gap-3 text-sm text-[#64748B]">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-[#0057D9]" />
              {room.location}
            </span>
            {room.capacity && (
              <span className="flex items-center gap-1">
                <Users size={12} className="text-[#0057D9]" />
                Up to {room.capacity}
              </span>
            )}
          </p>
        </div>

        {/* Amenities */}
        {room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-2.5 py-0.5 text-xs text-[#64748B]"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="rounded-full border border-[#E5E7EB] px-2.5 py-0.5 text-xs text-[#9CA3AF]">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between border-t border-[#F1F5F9] pt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">Per night</p>
            <p className="mt-0.5 text-2xl font-bold text-[#1A2235]">{formatCurrency(room.price)}</p>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="rounded-full bg-[#0057D9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003A8C]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
