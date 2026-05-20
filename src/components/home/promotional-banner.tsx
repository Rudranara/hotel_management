import Image from "next/image";
import Link from "next/link";

export function PromotionalBanner() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
          <div className="relative h-[320px] sm:h-[340px] md:h-[400px] lg:h-[460px] xl:h-[520px]">
          <Image
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury coastal resort banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(17,24,39,0.54)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-white/75 lg:text-sm">Perfect comfort awaits</p>
              <h2 className="mt-2.5 max-w-[17rem] text-2xl font-semibold leading-tight sm:max-w-md sm:text-3xl md:mt-3 md:max-w-xl lg:max-w-2xl lg:text-4xl xl:text-5xl">
              Explore More for Your Perfect Comfort Stay
            </h2>
            <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/80 sm:mt-3 sm:max-w-lg sm:text-base md:mt-4 lg:max-w-xl lg:text-lg">
              Find premium hotels, curated amenities, and destination-ready rooms designed for a truly restful getaway.
            </p>
            <Link
              href="/rooms"
              className="mt-4 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#111827] transition hover:shadow-lg sm:mt-5 md:mt-6 md:px-7 md:py-3 md:text-base lg:mt-8 lg:px-8 lg:py-4"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
