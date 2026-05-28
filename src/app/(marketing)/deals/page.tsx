import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, ArrowRight, Zap } from "lucide-react";
import { DEALS } from "@/lib/deals";

export const metadata = {
  title: "Exclusive Deals & Offers | Huts4u",
  description:
    "Browse our latest luxury hotel deals — early-bird discounts, room upgrades, and exclusive perks for smart travellers.",
};

export default function DealsPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
          alt="Exclusive deals"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-10 lg:px-20">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Zap className="h-3 w-3" />
            Exclusive Deals
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Special offers for{" "}
            <span className="text-[#FF6B35]">smart travellers</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/70">
            Hand-picked promotions on our finest rooms — with perks that go beyond the discount.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["Best Price Guarantee", "Flexible Cancellation", "Instant Confirmation"].map((b) => (
              <span key={b} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deals grid */}
      <section className="bg-[#F7F9FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {DEALS.map((deal) => (
              <Link
                key={deal.slug}
                href={`/deals/${deal.slug}`}
                className="group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#DBEAFE] hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-64 w-full sm:h-72">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                    {deal.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h2 className="text-xl font-bold leading-snug text-[#1A2235] transition group-hover:text-[#0057D9]">
                    {deal.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{deal.description}</p>

                  {/* Perks preview */}
                  <ul className="mt-5 space-y-2">
                    {deal.perks.slice(0, 3).map((perk) => (
                      <li key={perk} className="flex items-center gap-2.5 text-sm text-[#1A2235]">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" />
                        {perk}
                      </li>
                    ))}
                    {deal.perks.length > 3 && (
                      <li className="text-sm text-[#9CA3AF]">+{deal.perks.length - 3} more perks</li>
                    )}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-[#F3F4F6] pt-5">
                    <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                      <Clock className="h-3.5 w-3.5" />
                      Valid until {deal.validUntil}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0057D9] transition group-hover:gap-2.5">
                      {deal.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-[#0A1628] px-8 py-12 text-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
              Browse our rooms
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Not sure which deal fits your trip?
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Explore all available rooms and apply your preferred offer at checkout.
            </p>
            <Link
              href="/rooms"
              className="mt-7 inline-block rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
            >
              View all rooms
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
