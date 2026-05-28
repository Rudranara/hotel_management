import Link from "next/link";
import {
  Handshake, Building2, Globe, TrendingUp, Star, ShieldCheck, ArrowRight, CheckCircle, Zap, Mail,
} from "lucide-react";

export const metadata = {
  title: "Partner with Us | Huts4u",
  description: "List your property or join as a travel affiliate on Huts4u — India's fastest-growing hotel booking platform.",
};

const partnerTypes = [
  {
    icon: Building2,
    title: "Property owners",
    sub: "Hotels, homestays & villas",
    desc: "List your property on Huts4u and reach 50,000+ active travellers. Zero upfront cost — we only charge a small commission on successful bookings.",
    perks: ["Free listing setup & photography guidance", "Dedicated account manager", "Real-time booking dashboard", "Instant payouts within 48 hrs"],
    cta: "List your property",
    href: "mailto:properties@huts4u.com?subject=Property Listing Enquiry",
  },
  {
    icon: Globe,
    title: "Travel affiliates",
    sub: "Bloggers, influencers & agencies",
    desc: "Earn up to 8% commission on every booking referred through your unique affiliate link. Perfect for travel bloggers, YouTube creators, and booking agencies.",
    perks: ["Up to 8% commission per booking", "30-day cookie window", "Real-time earnings dashboard", "Dedicated affiliate support"],
    cta: "Become an affiliate",
    href: "mailto:affiliates@huts4u.com?subject=Affiliate Programme Enquiry",
  },
  {
    icon: Handshake,
    title: "Corporate & B2B",
    sub: "Companies & travel desks",
    desc: "Set up a corporate account for your team. Get negotiated rates, centralised invoicing, GST receipts, and a dedicated travel manager.",
    perks: ["Negotiated corporate rates", "GST invoices for every booking", "Centralised billing & reporting", "Priority customer support"],
    cta: "Set up corporate account",
    href: "mailto:corporate@huts4u.com?subject=Corporate Account Enquiry",
  },
];

const stats = [
  { value: "500+",   label: "Listed properties" },
  { value: "50K+",   label: "Monthly active users" },
  { value: "₹2 Cr+", label: "Paid to partners monthly" },
  { value: "4.8 ★",  label: "Avg booking satisfaction" },
];

export default function PartnersPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Grow with us</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Partner with Huts4u</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Whether you own a property, run a travel blog, or manage corporate travel — there&apos;s a partnership model built for you.
          </p>
          <a href="#programmes" className="btn-primary mt-8 inline-flex items-center gap-2">
            Explore programmes <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-0 px-4 sm:grid-cols-4 sm:px-6 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 border-r border-[#E5E7EB] px-6 py-8 last:border-r-0">
              <p className="text-3xl font-extrabold text-[#0057D9]">{s.value}</p>
              <p className="text-sm font-medium text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Partner types ── */}
      <section id="programmes" className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Partnership programmes</span>
            <h2 className="section-title mt-3">Find your fit</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {partnerTypes.map(({ icon: Icon, title, sub, desc, perks, cta, href }) => (
              <div key={title} className="card-lift flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF]">
                  <Icon className="h-6 w-6 text-[#0057D9]" />
                </div>
                <p className="mt-4 text-xl font-bold text-[#1A2235]">{title}</p>
                <p className="text-sm font-medium text-[#0057D9]">{sub}</p>
                <p className="mt-3 text-sm text-[#6B7280]">{desc}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-[#374151]">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0057D9]" /> {p}
                    </li>
                  ))}
                </ul>
                <a href={href} className="btn-primary mt-6 inline-flex items-center justify-center gap-2">
                  {cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why partner ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Why choose us</span>
            <h2 className="section-title mt-3">The Huts4u advantage</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp,  title: "Growing fast",     desc: "3× YoY growth means more eyeballs on your listing every month." },
              { icon: Zap,        title: "Instant payouts",   desc: "Earnings credited within 48 hrs of guest check-out — no waiting." },
              { icon: ShieldCheck,title: "Fraud protection",  desc: "Every booking is screened. Your revenue is safe and guaranteed." },
              { icon: Star,       title: "4.8★ platform",     desc: "Guests trust us. High satisfaction leads to more repeat bookings." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <p className="mt-4 font-bold text-[#1A2235]">{title}</p>
                <p className="mt-2 text-sm text-[#6B7280]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Ready to grow together?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Join 500+ partners already earning on the Huts4u platform. Reach out and we&apos;ll get you set up within 48 hours.
          </p>
          <a href="mailto:partners@huts4u.com" className="btn-primary mt-8 inline-flex items-center gap-2">
            <Mail className="h-4 w-4" /> Contact partnerships team
          </a>
        </div>
      </section>
    </main>
  );
}
