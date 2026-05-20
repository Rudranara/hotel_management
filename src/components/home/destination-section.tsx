import { ArrowLeft, ArrowRight } from "lucide-react";

import { DestinationCard } from "@/components/home/destination-card";

type Destination = {
  image: string;
  name: string;
  price: string;
  rating: string;
};

export function DestinationSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="about" className="py-6 md:py-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8 lg:mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Popular destinations</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl lg:text-4xl xl:text-5xl">Discover where your next stay begins</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F9FAFB] sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F9FAFB] sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
