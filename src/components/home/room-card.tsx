import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

type RoomCardProps = {
  room: {
    image: string;
    name: string;
    location: string;
    rating: string;
    price: string;
    oldPrice: string;
    meta: string;
  };
  href?: string;
};

export function RoomCard({ room, href }: RoomCardProps) {
  const inner = (
    <>
      <div className="relative h-[220px] overflow-hidden rounded-xl sm:h-52 lg:h-[240px] xl:h-[260px]">
        <Image src={room.image} alt={room.name} fill className="object-cover transition duration-500 group-hover:scale-[1.05]" sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, 33vw" />
        {/* Discount hint badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-[#FF6B35] px-2.5 py-0.5 text-[10px] font-bold text-white">SAVE 15%</span>
        </div>
      </div>
      <div className="space-y-2.5 px-1 pt-4 lg:space-y-3 lg:pt-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold leading-tight text-[#1A2235] lg:text-lg">{room.name}</h3>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#6B7280]">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0057D9]" />
              {room.location}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
            {room.rating}
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#9CA3AF]">{room.meta}</p>
        <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3 lg:pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Per Night</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-base font-bold text-[#1A2235] lg:text-xl">{room.price}</p>
              <p className="text-sm text-[#9CA3AF] line-through">{room.oldPrice}</p>
            </div>
          </div>
          {href ? (
            <span className="flex w-full items-center justify-center rounded-full bg-[#0057D9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003A8C] sm:w-auto lg:px-5">
              Book Now
            </span>
          ) : (
            <button className="flex w-full items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-2 text-sm font-semibold text-[#1A2235] transition hover:border-[#0057D9] hover:text-[#0057D9] sm:w-auto lg:px-5">
              Book Now
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DBEAFE] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] lg:rounded-3xl lg:p-4">
        {inner}
      </Link>
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DBEAFE] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] lg:rounded-3xl lg:p-4">
      {inner}
    </article>
  );
}
