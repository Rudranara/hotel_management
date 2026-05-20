import { BlogCard } from "@/components/home/blog-card";

type Article = {
  image: string;
  category: string;
  title: string;
  date: string;
  time: string;
};

export function BlogSection({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
      <div className="mb-6 md:mb-8 lg:mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] lg:text-sm">From the journal</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl lg:text-4xl xl:text-5xl">Fresh reads for better travel planning</h2>
      </div>

      {/* Single column on mobile, 2-col on sm, 3-col on desktop */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article.title} article={article} />
        ))}
      </div>
    </section>
  );
}
