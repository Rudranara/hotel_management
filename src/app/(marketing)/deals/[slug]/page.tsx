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
    <div className="bg-[#F8F8F6]">

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
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

        {/* Back */}
        <Link
          href="/deals"
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition hover:bg-white/20 sm:left-8 sm:top-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All deals
        </Link>

        <div className="absolute bottom-0 left-0 w-full px-5 pb-10 sm:px-10 lg:px-16">
          <span className="inline-block rounded-full bg-[#22C7C7] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            {deal.tag}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {deal.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:py-16">
        {/* Left: description + perks */}
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">About this offer</h2>
            <p className="mt-4 text-base leading-relaxed text-[#374151]">{deal.longDescription}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">What&apos;s included</h2>
            <ul className="mt-5 space-y-3">
              {deal.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[#374151]">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#22C7C7]" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Terms &amp; conditions</h2>
            <ul className="mt-5 space-y-3">
              {deal.terms.map((term) => (
                <li key={term} className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: sticky CTA card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#22C7C7] to-[#1AB5B5]" />
            <div className="p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#22C7C7]/10">
                  <Tag className="h-5 w-5 text-[#22C7C7]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Deal</p>
                  <p className="text-lg font-bold text-[#111827]">{deal.tag}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#6B7280]">{deal.description}</p>

              <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Valid until <strong>{deal.validUntil}</strong></span>
              </div>

              <Link
                href="/rooms"
                className="block w-full rounded-full bg-[#22C7C7] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#1AB5B5]"
              >
                Browse eligible rooms
              </Link>

              <Link
                href="/register"
                className="block w-full rounded-full border border-[#E5E7EB] px-6 py-3.5 text-center text-sm font-medium text-[#374151] transition hover:border-[#22C7C7]/40 hover:text-[#22C7C7]"
              >
                Create account to redeem
              </Link>

              <p className="text-center text-xs text-[#9CA3AF]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#22C7C7] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other deals */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-semibold text-[#111827]">Other offers you might like</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {DEALS.filter((d) => d.slug !== slug).map((other) => (
            <Link
              key={other.slug}
              href={`/deals/${other.slug}`}
              className="group flex gap-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 transition hover:shadow-md"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image src={other.image} alt={other.title} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="112px" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#22C7C7]">
                  {other.tag}
                </span>
                <h3 className="mt-1 text-sm font-semibold leading-snug text-[#111827] line-clamp-2">
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
