import Image from "next/image";
import Link from "next/link";

type DealCardProps = {
  deal: {
    image: string;
    tag: string;
    title: string;
    description: string;
    cta: string;
  };
  href?: string;
};

export function DealCard({ deal, href }: DealCardProps) {
  const inner = (
    <div className="relative h-[300px] sm:h-[310px] md:h-[350px] lg:h-[400px] xl:h-[440px]">
      <Image src={deal.image} alt={deal.title} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.04),rgba(17,24,39,0.72))]" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white sm:p-8 lg:p-9 xl:p-10">
        <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white backdrop-blur-sm sm:text-xs lg:text-sm">{deal.tag}</span>
        <h3 className="mt-2.5 max-w-[13rem] text-xl font-semibold leading-tight sm:max-w-md sm:text-2xl lg:max-w-lg lg:text-3xl xl:text-4xl">{deal.title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-[1.6] text-white/80 sm:text-base md:mt-2.5 lg:max-w-md">{deal.description}</p>
        <span className="mt-4 w-fit rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#111827] transition group-hover:bg-[#22C7C7] group-hover:text-white md:mt-5 lg:px-6 lg:py-3 lg:text-base">
          {deal.cta}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group relative block overflow-hidden rounded-2xl lg:rounded-3xl">
        {inner}
      </Link>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl lg:rounded-3xl">
      {inner}
    </article>
  );
}
