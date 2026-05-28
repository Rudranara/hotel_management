import Link from "next/link";
import { BlogCard } from "@/components/home/blog-card";

type Article = {
  image: string;
  category: string;
  title: string;
  date: string;
  time: string;
  author?: string;
  avatar?: string;
};

export function BlogSection({ articles }: { articles: Article[] }) {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div>
            <p className="section-label">From the Journal</p>
            <h2 className="section-title mt-3 max-w-lg">Fresh reads for smarter travel</h2>
          </div>
          <Link href="/blog" className="mt-4 text-sm font-semibold text-[#0057D9] transition hover:underline sm:mt-0">
            View all articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <BlogCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
