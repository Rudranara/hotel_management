import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

type DealCardProps = {
  deal: {
    image: string;
    tag: string;
    discount: number;
    title: string;
    description: string;
    cta: string;
    validUntil?: string;
  };
  href?: string;
};

export function DealCard({ deal, href }: DealCardProps) {
  const inner = (
    <>
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden rounded-xl sm:h-[240px] lg:h-[260px] xl:h-[280px]">
        <Image
          src={deal.image}
          alt={deal.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Discount badge */}
        <span className="absolute left-3 top-3 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-bold text-white shadow">
          SAVE {deal.discount}%
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 px-1 pt-4 lg:space-y-3.5 lg:pt-5">
        <span className="inline-block rounded-full bg-[#EEF4FF] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0057D9]">
          {deal.tag}
        </span>
        <h3 className="text-lg font-bold leading-snug text-[#1A2235] transition group-hover:text-[#0057D9] lg:text-xl xl:text-2xl">
          {deal.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#475569] line-clamp-2">
          {deal.description}
        </p>

        <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3 lg:pt-4">
          {deal.validUntil && (
            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              Until {deal.validUntil}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.35)] transition group-hover:bg-[#E55A24] group-hover:gap-2.5">
            {deal.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DBEAFE] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] lg:rounded-3xl lg:p-4">
        {inner}
      </Link>
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DBEAFE] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] lg:rounded-3xl lg:p-4">
      {inner}
    </article>
  );
}
