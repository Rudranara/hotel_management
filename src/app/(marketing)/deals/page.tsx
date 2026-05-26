import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { DEALS } from "@/lib/deals";

export const metadata = {
  title: "Exclusive Deals & Offers | Huts4u",
  description:
    "Browse our latest luxury hotel deals — early-bird discounts, room upgrades, and exclusive perks for smart travellers.",
};

export default function DealsPage() {
  return (
    <div className="bg-[#F8F8F6]">

      {/* Hero */}
      <section className="bg-[#020617] px-4 py-20 text-center sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#22C7C7]">
          Exclusive deals
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          Special offers for smart luxury travellers
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/55">
          Hand-picked promotions on our finest rooms — with perks that go beyond the discount.
        </p>
      </section>

      {/* Deals grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {DEALS.map((deal) => (
            <Link
              key={deal.slug}
              href={`/deals/${deal.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
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
                <span className="absolute left-5 top-5 rounded-full bg-[#22C7C7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                  {deal.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-7">
                <h2 className="text-xl font-semibold leading-snug text-[#111827] transition group-hover:text-[#22C7C7]">
                  {deal.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{deal.description}</p>

                {/* Perks preview */}
                <ul className="mt-5 space-y-2">
                  {deal.perks.slice(0, 3).map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-[#374151]">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#22C7C7]" />
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
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#22C7C7] transition group-hover:gap-2.5">
                    {deal.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-3xl bg-[#020617] px-8 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#22C7C7]">
            Browse our rooms
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Not sure which deal fits your trip?
          </h2>
          <p className="mt-3 text-sm text-white/50">
            Explore all available rooms and apply your preferred offer at checkout.
          </p>
          <Link
            href="/rooms"
            className="mt-7 inline-block rounded-full bg-[#22C7C7] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
          >
            View all rooms
          </Link>
        </div>
      </section>

    </div>
  );
}
