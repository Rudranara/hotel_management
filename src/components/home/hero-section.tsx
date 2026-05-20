import Image from "next/image";
import Link from "next/link";

import { BookingBar } from "@/components/home/booking-bar";

export function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-[60vh] overflow-hidden sm:h-[640px] md:h-[720px] lg:h-[820px] xl:h-[90vh]">
        <Image
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2400&q=80"
          alt="Luxury tropical coastline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.40)_0%,rgba(17,24,39,0.30)_45%,rgba(17,24,39,0.55)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-8 sm:justify-center sm:pb-0 sm:pt-0 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <p className="text-xs uppercase tracking-[0.32em] text-white/75 sm:text-sm lg:text-sm">Luxury travel made simple</p>
          <h1 className="mt-3 max-w-[280px] text-4xl font-semibold leading-tight text-white sm:mt-4 sm:max-w-2xl sm:text-5xl md:mt-5 md:max-w-3xl md:text-6xl lg:text-6xl xl:text-7xl">
            Discover Luxury Hotels &amp; Comfortable Stays
          </h1>
          <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/80 sm:mt-4 sm:max-w-md sm:text-base md:mt-5 md:max-w-xl md:text-lg lg:max-w-2xl">
            Explore premium escapes, relaxed beachfront resorts, and comfortable stays designed for memorable travel.
          </p>
          <Link
            href="/rooms"
            className="mt-5 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#111827] transition hover:translate-y-[-1px] hover:shadow-lg sm:mt-6 sm:px-6 sm:py-3 md:mt-8 md:px-7 md:py-3.5 md:text-base lg:px-8 lg:py-4"
          >
            Explore Hotels
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-4 max-w-[1400px] px-4 sm:-mt-12 sm:px-6 md:-mt-14 md:px-8 lg:-mt-16 lg:px-10 xl:px-12">
        <BookingBar />
      </div>
    </section>
  );
}
