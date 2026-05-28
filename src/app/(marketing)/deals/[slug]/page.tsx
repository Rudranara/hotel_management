import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowLeft, Clock, Tag } from "lucide-react";
import { DEALS, getDealBySlug } from "@/lib/deals";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DEALS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);
  if (!deal) return {};
  return {
    title: `${deal.tag} — ${deal.title} | Huts4u`,
    description: deal.description,
  };
}

export default async function DealDetailPage({ params }: Props) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);
  if (!deal) notFound();

  return (
    <div className="bg-[#F7F9FC]">

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden lg:h-[65vh]">
        <Image
          src={deal.heroImage}
          alt={deal.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        {/* Back */}
        <Link
          href="/deals"
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition hover:bg-white/20 sm:left-8 sm:top-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All deals
        </Link>

        <div className="absolute bottom-0 left-0 w-full px-5 pb-10 sm:px-10 lg:px-16">
          <span className="inline-block rounded-full bg-[#FF6B35] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            {deal.tag}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {deal.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:py-16">
        {/* Left: description + perks */}
        <div className="space-y-10">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <p className="section-label">About this offer</p>
            <h2 className="mt-2 text-xl font-bold text-[#1A2235]">What makes this deal special</h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">{deal.longDescription}</p>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <p className="section-label">Included perks</p>
            <h2 className="mt-2 text-xl font-bold text-[#1A2235]">What&apos;s included</h2>
            <ul className="mt-5 space-y-3">
              {deal.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[#1A2235]">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0057D9]" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <p className="section-label">Terms</p>
            <h2 className="mt-2 text-xl font-bold text-[#1A2235]">Terms &amp; conditions</h2>
            <ul className="mt-5 space-y-3">
              {deal.terms.map((term) => (
                <li key={term} className="flex items-start gap-3 text-sm text-[#475569]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: sticky CTA card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0057D9] to-[#FF6B35]" />
            <div className="space-y-5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <Tag className="h-5 w-5 text-[#0057D9]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Deal</p>
                  <p className="text-lg font-bold text-[#1A2235]">{deal.tag}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#475569]">{deal.description}</p>

              <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Valid until <strong>{deal.validUntil}</strong></span>
              </div>

              <Link
                href={`/rooms?type=${encodeURIComponent(deal.roomType)}`}
                className="block w-full rounded-full bg-[#FF6B35] px-6 py-3.5 text-center text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
              >
                Browse eligible rooms
              </Link>

              <Link
                href="/register"
                className="block w-full rounded-full border border-[#E5E7EB] px-6 py-3.5 text-center text-sm font-medium text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
              >
                Create account to redeem
              </Link>

              <p className="text-center text-xs text-[#9CA3AF]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0057D9] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other deals */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="section-label">More offers</p>
        <h2 className="mt-2 mb-6 text-xl font-bold text-[#1A2235]">Other offers you might like</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {DEALS.filter((d) => d.slug !== slug).map((other) => (
            <Link
              key={other.slug}
              href={`/deals/${other.slug}`}
              className="group flex gap-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 transition hover:border-[#DBEAFE] hover:shadow-md"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image src={other.image} alt={other.title} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="112px" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B35]">
                  {other.tag}
                </span>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#1A2235] group-hover:text-[#0057D9]">
                  {other.title}
                </h3>
                <p className="mt-1 text-xs text-[#9CA3AF]">Until {other.validUntil}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
