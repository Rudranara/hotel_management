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
        <Image src={room.image} alt={room.name} fill className="object-cover transition duration-500 hover:scale-[1.04]" sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, 33vw" />
      </div>
      <div className="space-y-2.5 px-2 pt-4 lg:space-y-3 lg:px-2.5 lg:pt-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight text-[#111827] lg:text-lg">{room.name}</h3>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#6B7280] lg:text-base">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#22C7C7] lg:h-4 lg:w-4" />
              {room.location}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F0FDFA] px-2.5 py-0.5 text-xs text-[#0F766E] lg:px-3 lg:text-sm">
            <Star className="h-2.5 w-2.5 fill-current lg:h-3 lg:w-3" />
            {room.rating}
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#9CA3AF] lg:text-sm">{room.meta}</p>
        <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-3 lg:pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF] lg:text-sm">Per Night</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-base font-semibold text-[#111827] lg:text-xl">{room.price}</p>
              <p className="text-sm text-[#9CA3AF] line-through lg:text-base">{room.oldPrice}</p>
            </div>
          </div>
          {href ? (
            <span className="flex w-full items-center justify-center rounded-full bg-[#22C7C7] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1AB5B5] sm:w-auto sm:py-2 lg:px-5 lg:py-2.5 lg:text-base">
              Reserve
            </span>
          ) : (
            <button className="flex w-full items-center justify-center rounded-full border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#111827] transition hover:border-[#111827] hover:shadow-sm sm:w-auto sm:py-2 lg:px-5 lg:py-2.5 lg:text-base">
              Reserve
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] lg:rounded-3xl lg:p-4">
        {inner}
      </Link>
    );
  }

  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] lg:rounded-3xl lg:p-4">
      {inner}
    </article>
  );
}
