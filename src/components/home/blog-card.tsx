import Image from "next/image";

type BlogCardProps = {
  article: {
    image: string;
    category: string;
    title: string;
    date: string;
    time: string;
    author?: string;
    avatar?: string;
  };
};

const categoryColors: Record<string, string> = {
  "Travel Tips": "bg-amber-500/15 text-amber-700",
  "Destination": "bg-emerald-500/15 text-emerald-700",
  "Hospitality": "bg-blue-500/15 text-[#0057D9]",
};

export function BlogCard({ article }: BlogCardProps) {
  const colorClass = categoryColors[article.category] ?? "bg-[#F3F4F6] text-[#6B7280]";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)]">
      {/* Image */}
      <div className="relative h-[240px] overflow-hidden sm:h-[260px] lg:h-[300px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${colorClass}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="flex-1 text-base font-bold leading-snug text-[#1A2235] transition-colors duration-200 group-hover:text-[#0057D9] sm:text-lg lg:text-xl">
          {article.title}
        </h3>

        {/* Author + reading time */}
        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
          {article.author ? (
            <div className="flex items-center gap-2.5">
              {article.avatar ? (
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E5E7EB]">
                  <Image src={article.avatar} alt={article.author} fill className="object-cover" sizes="32px" />
                </div>
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0057D9] text-xs font-bold text-white">
                  {article.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-[#1A2235]">{article.author}</p>
                <p className="text-[11px] text-[#9CA3AF]">{article.date}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#9CA3AF]">{article.date}</p>
          )}
          <div className="flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2.5 py-1">
            <span className="text-[11px] font-medium text-[#6B7280]">{article.time}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
