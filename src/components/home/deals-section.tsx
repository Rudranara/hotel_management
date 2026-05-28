import Link from "next/link";
import { DealCard } from "@/components/home/deal-card";
import { DEALS } from "@/lib/deals";

export function DealsSection() {
  return (
    <section id="offers" className="bg-[#F7F9FC] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
        <div>
          <p className="section-label">Exclusive Deals</p>
          <h2 className="section-title mt-3 max-w-lg">Special offers crafted for smart luxury travelers</h2>
        </div>
        <Link
          href="/deals"
          className="shrink-0 text-sm font-semibold text-[#0057D9] transition hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {DEALS.map((deal) => (
          <DealCard key={deal.slug} deal={deal} href={`/deals/${deal.slug}`} />
        ))}
      </div>
      </div>
    </section>
  );
}
