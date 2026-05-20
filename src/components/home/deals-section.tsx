import { DealCard } from "@/components/home/deal-card";

type Deal = {
  image: string;
  tag: string;
  title: string;
  description: string;
  cta: string;
};

export function DealsSection({ deals }: { deals: Deal[] }) {
  return (
    <section id="offers" className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="mb-6 md:mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">Exclusive deals</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl lg:text-4xl xl:text-5xl">Special offers crafted for smart luxury travelers</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {deals.map((deal) => (
          <DealCard key={deal.title} deal={deal} />
        ))}
      </div>
    </section>
  );
}
