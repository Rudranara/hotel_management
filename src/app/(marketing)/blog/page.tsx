import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/home/blog-card";
import {
  BookOpen,
  ArrowRight,
  Zap,
  Tag,
  Search,
  MapPin,
  Compass,
  Star,
  Coffee,
  Plane,
} from "lucide-react";

export const metadata = {
  title: "Blog & Travel Tips | Huts4u",
  description:
    "Destination guides, travel tips, hospitality insights, and expert advice to help you plan the perfect trip.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const featuredArticle = {
  image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=80",
  category: "Destination",
  title: "The ultimate guide to India's most breathtaking coastal destinations in 2026",
  excerpt:
    "From the sun-drenched shores of Goa to the serene backwaters of Kerala — we explore the top coastal escapes that belong on every traveller's bucket list this year.",
  date: "May 25, 2026",
  time: "8 min read",
  author: "Ananya Bose",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  slug: "#",
};

const articles = [
  {
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    category: "Travel Tips",
    title: "How to choose the perfect luxury stay for a weekend escape",
    date: "May 19, 2026",
    time: "5 min read",
    author: "Ananya Bose",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    category: "Destination",
    title: "Why coastal destinations are trending for premium travel now",
    date: "May 16, 2026",
    time: "6 min read",
    author: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    category: "Hospitality",
    title: "Modern hotel amenities guests now expect from top booking platforms",
    date: "May 11, 2026",
    time: "4 min read",
    author: "Meera Pillai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    category: "Travel Tips",
    title: "10 packing hacks that seasoned travellers swear by every trip",
    date: "May 8, 2026",
    time: "4 min read",
    author: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    category: "Destination",
    title: "Hidden hill stations in North India you haven't explored yet",
    date: "May 4, 2026",
    time: "7 min read",
    author: "Meera Pillai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    category: "Hospitality",
    title: "Why boutique hotels are outshining five-star chains for experience",
    date: "April 28, 2026",
    time: "5 min read",
    author: "Ananya Bose",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
];

const categories = [
  { icon: Compass,  label: "All",         count: 42 },
  { icon: MapPin,   label: "Destination", count: 18 },
  { icon: Star,     label: "Travel Tips", count: 14 },
  { icon: Coffee,   label: "Hospitality", count: 10 },
];

const trendingTopics = [
  "Beach holidays", "Budget travel", "Honeymoon", "Family trips",
  "Solo travel", "Hill stations", "Luxury stays", "Weekend getaways",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[380px] w-full overflow-hidden sm:h-[440px] md:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80"
          alt="Travel blog"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <BookOpen className="h-3 w-3" /> Blog & Travel Tips
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Stories, tips &<br />
            <span className="text-[#FF6B35]">inspiration.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Destination guides, travel hacks, and hospitality insights from our team of expert travellers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: MapPin,  label: "Destination guides" },
              { icon: Zap,     label: "Expert travel tips" },
              { icon: Plane,   label: "Trip inspiration" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <Icon className="h-3.5 w-3.5 text-[#FF6B35]" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#E5E7EB] px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: BookOpen, label: "40+ articles",         sub: "New posts every week" },
            { icon: MapPin,   label: "Destinations covered", sub: "India & across the world" },
            { icon: Star,     label: "Expert writers",       sub: "Seasoned travel journalists" },
            { icon: Zap,      label: "Fresh picks weekly",   sub: "Curated content, updated regularly" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF]">
                <Icon className="h-4 w-4 text-[#0057D9]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A2235]">{label}</p>
                <p className="text-xs text-[#64748B]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured article ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="section-label flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" /> Featured
            </p>
            <h2 className="section-title">Editor&apos;s pick</h2>
          </div>

          <Link href={featuredArticle.slug} className="group block overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.07)] transition hover:border-[#DBEAFE] hover:shadow-xl lg:flex">
            <div className="relative h-64 shrink-0 overflow-hidden lg:h-auto lg:w-[55%]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:1024px)100vw,55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#0057D9]">
                {featuredArticle.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h3 className="text-xl font-bold leading-snug text-[#1A2235] transition group-hover:text-[#0057D9] sm:text-2xl lg:text-3xl">
                {featuredArticle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#475569]">
                {featuredArticle.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[#F1F5F9] pt-5">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#E5E7EB]">
                    <Image src={featuredArticle.avatar} alt={featuredArticle.author} fill className="object-cover" sizes="36px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A2235]">{featuredArticle.author}</p>
                    <p className="text-xs text-[#9CA3AF]">{featuredArticle.date} · {featuredArticle.time}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#0057D9] transition group-hover:gap-2.5">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Category filter + search ── */}
      <section className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(({ icon: Icon, label, count }) => (
              <button
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1A2235] transition hover:border-[#0057D9] hover:text-[#0057D9] first:border-[#0057D9] first:bg-[#EEF4FF] first:text-[#0057D9]"
              >
                <Icon className="h-3.5 w-3.5" /> {label}
                <span className="rounded-full bg-[#F1F5F9] px-1.5 py-0.5 text-[10px] font-bold text-[#64748B]">{count}</span>
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="search"
              placeholder="Search articles…"
              className="rounded-full border border-[#E5E7EB] bg-[#F7F9FC] py-2 pl-9 pr-4 text-sm text-[#1A2235] placeholder-[#9CA3AF] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#EEF4FF]"
            />
          </div>
        </div>
      </section>

      {/* ── Article grid ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="section-label flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Latest Articles
            </p>
            <h2 className="section-title">Recent posts</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BlogCard key={article.title} article={article} />
            ))}
          </div>

          {/* Load more */}
          <div className="mt-10 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-8 py-3 text-sm font-semibold text-[#1A2235] shadow-sm transition hover:border-[#0057D9] hover:text-[#0057D9]">
              Load more articles <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Trending topics ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Trending</p>
            <h2 className="section-title mx-auto max-w-xl">Popular topics right now</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                className="rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A2235] shadow-sm transition hover:border-[#0057D9] hover:bg-[#EEF4FF] hover:text-[#0057D9]"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md lg:flex">
            <div className="relative h-64 shrink-0 lg:h-auto lg:w-[45%]">
              <Image
                src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=1200&q=80"
                alt="Travel newsletter"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Newsletter</p>
              <h2 className="section-title mt-2 max-w-md">Get travel tips in your inbox</h2>
              <p className="mt-3 text-sm text-[#475569]">
                Join 25,000+ travellers who get our weekly destination guides, packing tips, and exclusive hotel deals — delivered every Monday.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Weekly destination spotlight",
                  "Exclusive deals for subscribers",
                  "No spam, unsubscribe anytime",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#1A2235]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                      <span className="h-2 w-2 rounded-full bg-[#0057D9]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <form className="mt-7 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-5 py-3 text-sm text-[#1A2235] placeholder-[#9CA3AF] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#EEF4FF]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Tag className="h-3.5 w-3.5" /> Plan your next trip
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Inspired? Now book your stay.
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Turn your travel inspiration into reality — browse luxury rooms, exclusive deals, and curated packages at Huts4u.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rooms"
              className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              Browse hotel rooms
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
