import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Clock,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle,
  Tag,
  Globe,
  Users,
  BadgeCheck,
  AlertCircle,
  HeartPulse,
  Plane,
  Luggage,
  PhoneCall,
} from "lucide-react";

export const metadata = {
  title: "Travel Insurance | Huts4u",
  description:
    "Protect every journey with comprehensive travel insurance — medical emergencies, trip cancellations, lost baggage, and 24/7 support.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    name: "Basic Cover",
    tag: "Budget",
    tagColor: "bg-[#16A34A] text-white",
    price: "₹299",
    unit: "per trip",
    description: "Essential protection for short domestic or regional trips — covers medical emergencies and trip delays.",
    covers: ["Medical up to ₹5L", "Trip delay", "Lost documents", "24/7 helpline"],
  },
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
    name: "Standard Cover",
    tag: "Most Popular",
    tagColor: "bg-[#FF6B35] text-white",
    price: "₹699",
    unit: "per trip",
    description: "Our bestselling plan — balanced protection for international trips with generous medical and baggage cover.",
    covers: ["Medical up to ₹25L", "Baggage loss ₹1L", "Trip cancellation", "Flight delay"],
  },
  {
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=900&q=80",
    name: "Comprehensive Cover",
    tag: "Best Value",
    tagColor: "bg-[#0057D9] text-white",
    price: "₹1,299",
    unit: "per trip",
    description: "Complete protection for long-haul and high-value trips — includes adventure sports and home burglary cover.",
    covers: ["Medical up to ₹75L", "Baggage loss ₹2L", "Adventure sports", "Home burglary"],
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    name: "Annual Multi-Trip",
    tag: "Frequent Traveller",
    tagColor: "bg-[#7C3AED] text-white",
    price: "₹3,999",
    unit: "per year",
    description: "One plan, unlimited trips — perfect for business travellers and wanderers who never stay in one place.",
    covers: ["Unlimited trips/year", "Medical up to ₹50L", "All destinations", "Priority claims"],
  },
];

const coverageAreas = [
  { icon: HeartPulse, label: "Medical Emergencies",    desc: "Hospitalisation, evacuation, and repatriation cover up to ₹75 lakhs." },
  { icon: Plane,      label: "Trip Cancellation",      desc: "Get reimbursed if you cancel due to illness, natural disaster, or airline default." },
  { icon: Luggage,    label: "Baggage & Documents",    desc: "Compensation for lost, stolen, or delayed baggage and travel documents." },
  { icon: Clock,      label: "Flight Delay & Missed",  desc: "Daily allowance and rebooking support when flights are delayed or missed." },
  { icon: Shield,     label: "Personal Liability",     desc: "Cover for third-party injuries or property damage during your trip." },
  { icon: PhoneCall,  label: "24/7 Emergency Helpline",desc: "Round-the-clock assistance from our global emergency response team." },
];

const steps = [
  { step: "01", title: "Choose your plan",         desc: "Select Basic, Standard, Comprehensive, or Annual — based on your trip length and destination." },
  { step: "02", title: "Enter traveller details",  desc: "Add your name, passport, travel dates, and destination — takes under 2 minutes." },
  { step: "03", title: "Get instant policy",       desc: "Pay securely and receive your insurance certificate by email immediately." },
  { step: "04", title: "Claim with ease",          desc: "File claims online or call our 24/7 helpline — most claims settled within 7 days." },
];

const features = [
  { icon: BadgeCheck,  label: "Cashless hospitalisation", sub: "Network hospitals in 150+ countries" },
  { icon: Globe,       label: "Worldwide cover",          sub: "Valid across all international destinations" },
  { icon: ShieldCheck, label: "Instant policy issuance",  sub: "Certificate in your inbox within seconds" },
  { icon: Users,       label: "Family floater available", sub: "Cover your entire family under one plan" },
];

const faqs = [
  { q: "When should I buy travel insurance?",              a: "Buy your policy immediately after booking your trip — this ensures you're covered for pre-departure cancellations. You can also buy up to 24 hours before departure." },
  { q: "Does the plan cover pre-existing conditions?",     a: "Some plans offer cover for stable pre-existing conditions — check the plan details or speak to our team for a tailored recommendation." },
  { q: "How do I make a claim?",                           a: "Log in to your account, go to 'My Policies', and click 'File a Claim'. Alternatively, call our 24/7 helpline. Most claims are processed within 5–7 working days." },
  { q: "Is adventure sports covered?",                     a: "Adventure sports (trekking, skiing, scuba diving, etc.) are covered under our Comprehensive and Annual Multi-Trip plans. Basic and Standard plans exclude high-risk activities." },
];

const testimonials = [
  { name: "Priya M.",   dest: "Paris",    rating: 5, text: "Filed a medical claim in Paris and was reimbursed within 6 days. The 24/7 helpline was incredibly helpful." },
  { name: "Rahul S.",   dest: "Dubai",    rating: 5, text: "My flight got cancelled and the trip cancellation cover reimbursed my entire hotel booking. Absolutely worth it." },
  { name: "Ananya R.",  dest: "Thailand", rating: 5, text: "Bought the Annual Multi-Trip plan — the best decision for someone who travels 8–10 times a year." },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function InsurancePage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80"
          alt="Travel insurance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Shield className="h-3 w-3" /> Travel Insurance
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Travel with confidence,<br />
            <span className="text-[#FF6B35]">covered everywhere.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Comprehensive travel insurance from ₹299 — medical, cancellation, baggage, and 24/7 emergency support worldwide.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "Instant policy issuance" },
              { icon: ShieldCheck, label: "Cashless hospitalisation" },
              { icon: Zap,         label: "Claims settled in 7 days" },
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
            { icon: Globe,       label: "150+ countries",          sub: "Worldwide medical network" },
            { icon: BadgeCheck,  label: "Cashless claims",         sub: "At 5,000+ partner hospitals" },
            { icon: ShieldCheck, label: "Instant policy",          sub: "Certificate in seconds" },
            { icon: PhoneCall,   label: "24/7 helpline",           sub: "Emergency support, always on" },
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

      {/* ── Plans ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Our Plans
              </p>
              <h2 className="section-title">Pick the cover that fits your trip</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${plan.tagColor}`}>
                    {plan.tag}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1A2235] transition group-hover:text-[#0057D9]">
                    {plan.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#475569]">
                    {plan.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {plan.covers.map((c) => (
                      <span key={c} className="rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0057D9]">
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-[#F1F5F9] pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Starting from</p>
                      <p className="text-xl font-extrabold text-[#1A2235]">{plan.price}</p>
                      <p className="text-xs text-[#9CA3AF]">{plan.unit}</p>
                    </div>
                    <button className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24]">
                      Get Cover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we cover ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Coverage</p>
            <h2 className="section-title mx-auto max-w-xl">Everything that can go wrong, covered</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              From minor inconveniences to major emergencies — our plans protect you at every stage of your journey.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coverageAreas.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#DBEAFE] hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <p className="font-bold text-[#1A2235]">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="section-label justify-center">How it works</p>
            <h2 className="section-title mx-auto max-w-xl">Insured in 4 easy steps</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Getting covered takes less than 2 minutes — no paperwork, no waiting.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-full border-t border-dashed border-[#DBEAFE] lg:block" />
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <span className="text-lg font-extrabold text-[#0057D9]">{s.step}</span>
                </div>
                <p className="font-bold text-[#1A2235]">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Why choose us</p>
            <h2 className="section-title mx-auto max-w-xl">Your safety is our priority</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Trusted by thousands of travellers — fast claims, global cover, and real people answering your calls.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#DBEAFE] hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <p className="font-bold text-[#1A2235]">{label}</p>
                <p className="mt-1 text-sm text-[#64748B]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md lg:flex">
            <div className="relative h-64 shrink-0 lg:h-auto lg:w-[45%]">
              <Image
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80"
                alt="Travel insurance benefits"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Every policy includes</p>
              <h2 className="section-title mt-2 max-w-md">Complete protection, zero surprises</h2>
              <p className="mt-3 text-sm text-[#475569]">
                All our plans include these core benefits — no hidden exclusions in the fine print.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Medical emergency cover (hospitalisation & evacuation)",
                  "Trip cancellation & curtailment reimbursement",
                  "Lost, stolen, or delayed baggage compensation",
                  "Flight delay & missed connection allowance",
                  "24/7 global emergency helpline",
                  "Digital policy certificate — no paperwork",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#1A2235]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/flights"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
                >
                  Book your flight
                </Link>
                <Link
                  href="/visa"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
                >
                  Visa services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Traveller stories</p>
            <h2 className="section-title mx-auto max-w-xl">Glad they were covered</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map(({ name, dest, rating, text }) => (
              <div key={name} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#DBEAFE] hover:shadow-md">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FF6B35] text-[#FF6B35]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[#475569]">"{text}"</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#F1F5F9] pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FF] text-xs font-bold text-[#0057D9]">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A2235]">{name}</p>
                    <p className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                      <MapPin className="h-3 w-3" /> {dest}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">FAQ</p>
            <h2 className="section-title mx-auto max-w-xl">Frequently asked questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0057D9]" />
                  <div>
                    <p className="font-bold text-[#1A2235]">{q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Tag className="h-3.5 w-3.5" /> Travel smart
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Don't travel unprotected.
          </h2>
          <p className="mt-4 text-sm text-white/60">
            A single medical emergency abroad can cost more than your entire trip. Get insured in minutes — from just ₹299.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rooms"
              className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              Browse hotel rooms
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
