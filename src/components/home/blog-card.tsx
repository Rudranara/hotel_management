import Image from "next/image";

type BlogCardProps = {
  article: {
    image: string;
    category: string;
    title: string;
    date: string;
    time: string;
  };
};

export function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="rounded-xl bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] lg:rounded-2xl lg:p-4">
        <div className="relative h-[220px] overflow-hidden rounded-lg sm:h-52 lg:h-64 xl:h-[280px]">
        <Image src={article.image} alt={article.title} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 33vw" />
      </div>
      <div className="px-1.5 pt-4 lg:px-2 lg:pt-5">
        <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#6B7280] lg:text-sm">
          {article.category}
        </span>
        <h3 className="mt-3 text-base font-semibold leading-snug text-[#111827] lg:mt-3.5 lg:text-xl">{article.title}</h3>
        <p className="mt-2.5 text-sm text-[#9CA3AF] lg:mt-3 lg:text-base">
          {article.date} &middot; {article.time}
        </p>
      </div>
    </article>
  );
}
