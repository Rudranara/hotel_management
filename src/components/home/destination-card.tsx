import Image from "next/image";
import { Star } from "lucide-react";

type DestinationCardProps = {
  destination: {
    image: string;
    name: string;
    price: string;
    rating: string;
  };
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] lg:rounded-2xl lg:p-3">
      <div className="relative h-[120px] overflow-hidden rounded-lg sm:h-44 lg:h-52 xl:h-[260px]">
        <Image src={destination.image} alt={destination.name} fill className="object-cover transition duration-500 group-hover:scale-[1.05]" sizes="(max-width: 640px) 190px, (max-width: 768px) 230px, 20vw" />
      </div>
      <div className="space-y-1.5 px-1 pb-1 pt-3 lg:space-y-2 lg:px-1.5 lg:pt-3.5">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-sm font-semibold text-[#111827] lg:text-base xl:text-lg">{destination.name}</h3>
          <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#F0FDFA] px-2 py-0.5 text-[10px] text-[#0F766E] lg:px-2.5 lg:text-xs xl:text-sm">
            <Star className="h-2 w-2 fill-current lg:h-2.5 lg:w-2.5" />
            {destination.rating}
          </span>
        </div>
        <p className="text-xs text-[#6B7280] lg:text-sm xl:text-base">{destination.price} / night</p>
      </div>
    </article>
  );
}
