import Link from "next/link";
import { DealCard } from "@/components/home/deal-card";
import { DEALS } from "@/lib/deals";

export function DealsSection() {
  return (
    <section id="offers" className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Exclusive deals</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl lg:text-4xl xl:text-5xl">Special offers crafted for smart luxury travelers</h2>
        </div>
        <Link
          href="/deals"
          className="shrink-0 text-sm font-medium uppercase tracking-[0.22em] text-[#111827] transition hover:text-[#22C7C7] lg:text-base"
        >
          View All
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {DEALS.map((deal) => (
          <DealCard key={deal.slug} deal={deal} href={`/deals/${deal.slug}`} />
        ))}
      </div>
    </section>
  );
}
