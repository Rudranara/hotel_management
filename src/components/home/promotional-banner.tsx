import Image from "next/image";
import Link from "next/link";

export function PromotionalBanner() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-12 xl:px-12">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="relative h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=85"
            alt="Luxury infinity pool resort"
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/60 to-[#0A1628]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 via-transparent to-transparent" />

          {/* Decorative orb */}
          <div className="absolute -right-24 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#0057D9]/15 blur-[100px]" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                ✦ Exclusive Experiences
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
                Discover Experiences<br />
                <span className="text-[#FF6B35]">Beyond Accommodation</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                Unlock private tours, luxury dining, exclusive experiences, and unforgettable memories.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/rooms" className="btn-primary">
                  Explore Experiences
                </Link>
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

