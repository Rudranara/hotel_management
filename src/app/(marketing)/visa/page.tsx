import Image from "next/image";
import Link from "next/link";
import {
  FileText,
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
} from "lucide-react";

export const metadata = {
  title: "Visa Services | Huts4u",
  description:
    "Apply for tourist, business, and e-visas online — expert assistance, fast processing, and high approval rates for 100+ countries.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const visaTypes = [
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
    type: "Tourist Visa",
    tag: "Most Popular",
    tagColor: "bg-[#FF6B35] text-white",
    processing: "3–7 working days",
    price: "₹2,499",
    unit: "service fee",
    description: "Explore new destinations for leisure — our team handles the paperwork so you can focus on packing.",
    perks: ["Document checklist", "Application filing", "Embassy liaison", "Status tracking"],
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    type: "Business Visa",
    tag: "Express Available",
    tagColor: "bg-[#0057D9] text-white",
    processing: "2–5 working days",
    price: "₹3,499",
    unit: "service fee",
    description: "Attend meetings, conferences, and trade events overseas with a properly documented business visa.",
    perks: ["Cover letter drafting", "Invitation support", "Priority filing", "Status tracking"],
  },
  {
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80",
    type: "e-Visa / Visa on Arrival",
    tag: "Fastest",
    tagColor: "bg-[#16A34A] text-white",
    processing: "24–72 hours",
    price: "₹1,299",
    unit: "service fee",
    description: "Electronic visas for 60+ countries — apply online, receive approval digitally, and travel without queues.",
    perks: ["Online application", "Digital approval", "No embassy visit", "Email delivery"],
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    type: "Student Visa",
    tag: "Long-stay",
    tagColor: "bg-[#7C3AED] text-white",
    processing: "7–21 working days",
    price: "₹4,999",
    unit: "service fee",
    description: "Heading abroad to study? We guide you through university admission letters, financial proofs, and embassy interviews.",
    perks: ["Admission doc review", "Financial proof help", "Interview prep", "Full follow-up"],
  },
];

const popularDestinations = [
  { image: "https://images.unsplash.com/photo-1431274172761-fcdab704f6f7?auto=format&fit=crop&w=900&q=80", country: "France",       code: "🇫🇷", processing: "5–7 days",   price: "₹2,499" },
  { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80", country: "Switzerland",   code: "🇨🇭", processing: "5–7 days",   price: "₹2,499" },
  { image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80", country: "UK",            code: "🇬🇧", processing: "3–5 days",   price: "₹3,999" },
  { image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80", country: "USA",           code: "🇺🇸", processing: "4–8 weeks",  price: "₹4,999" },
  { image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80", country: "Japan",         code: "🇯🇵", processing: "3–5 days",   price: "₹1,999" },
  { image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80", country: "UAE / Dubai",   code: "🇦🇪", processing: "24–48 hrs",  price: "₹1,499" },
  { image: "https://images.unsplash.com/photo-1557531365-e8b22d93e1ce?auto=format&fit=crop&w=900&q=80", country: "Thailand",      code: "🇹🇭", processing: "24–48 hrs",  price: "₹999"   },
  { image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80", country: "Singapore",     code: "🇸🇬", processing: "2–3 days",   price: "₹1,299" },
];

const steps = [
  { step: "01", title: "Choose your destination",  desc: "Tell us the country and visa type you need — we'll show you exactly what's required." },
  { step: "02", title: "Upload your documents",    desc: "Upload scanned copies through our secure portal. We verify completeness before submission." },
  { step: "03", title: "We file on your behalf",   desc: "Our visa experts submit your application and liaise directly with the embassy or consulate." },
  { step: "04", title: "Receive your visa",        desc: "Track real-time status updates. Your approved visa is delivered digitally or by courier." },
];

const features = [
  { icon: BadgeCheck, label: "98% approval rate",       sub: "Verified across 10,000+ applications" },
  { icon: Globe,      label: "100+ countries covered",  sub: "Tourist, business, student & e-visas" },
  { icon: ShieldCheck, label: "Secure document portal", sub: "256-bit encrypted file handling" },
  { icon: Users,      label: "Dedicated visa advisor",  sub: "A real expert manages your case" },
];

const faqs = [
  { q: "How early should I apply for a visa?",          a: "We recommend applying at least 3–4 weeks before travel for standard visas, and 6–8 weeks for US or UK visas." },
  { q: "What documents are typically required?",         a: "A valid passport, passport-size photos, flight itinerary, hotel booking, bank statements, and a cover letter — we send you a full checklist once you begin." },
  { q: "Do you offer express or urgent processing?",     a: "Yes — express processing is available for most destinations at an additional fee. Contact us for same-day assistance." },
  { q: "What if my visa application is rejected?",       a: "We analyse the rejection reason and assist you in re-applying at no extra service charge if the rejection was due to a documentation issue." },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VisaPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2400&q=80"
          alt="Visa services"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <FileText className="h-3 w-3" /> Visa Services
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your visa, sorted<br />
            <span className="text-[#FF6B35]">stress-free.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Expert visa assistance for 100+ countries — we handle the paperwork, you enjoy the journey.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Star,        label: "98% approval rate" },
              { icon: ShieldCheck, label: "Secure document portal" },
              { icon: Zap,         label: "Express processing available" },
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
            { icon: Globe,       label: "100+ countries",        sub: "All major visa destinations" },
            { icon: BadgeCheck,  label: "98% approval rate",     sub: "Across 10,000+ applications" },
            { icon: ShieldCheck, label: "Secure portal",         sub: "256-bit encrypted uploads" },
            { icon: Zap,         label: "Express available",     sub: "24-hour processing on select visas" },
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

      {/* ── Visa types ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" /> Visa Types
              </p>
              <h2 className="section-title">Find the right visa for your trip</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visaTypes.map((visa) => (
              <div
                key={visa.type}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={visa.image}
                    alt={visa.type}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${visa.tagColor}`}>
                    {visa.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Clock className="h-3 w-3" /> {visa.processing}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#1A2235] group-hover:text-[#0057D9] transition text-lg">
                    {visa.type}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-2">
                    {visa.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {visa.perks.map((perk) => (
                      <span key={perk} className="rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0057D9]">
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-[#F1F5F9] pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Service fee from</p>
                      <p className="text-xl font-extrabold text-[#1A2235]">{visa.price}</p>
                      <p className="text-xs text-[#9CA3AF]">{visa.unit}</p>
                    </div>
                    <button className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24]">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular destinations ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
            <div>
              <p className="section-label flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Popular Destinations
              </p>
              <h2 className="section-title">Visas for top travel destinations</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {popularDestinations.map((dest) => (
              <div
                key={dest.country}
                className="card-lift group cursor-pointer overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#DBEAFE]"
              >
                <div className="relative h-24 overflow-hidden sm:h-28">
                  <Image
                    src={dest.image}
                    alt={dest.country}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)50vw,12vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-lg">{dest.code}</span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold text-[#1A2235] group-hover:text-[#0057D9] transition leading-tight truncate">{dest.country}</p>
                  <p className="mt-0.5 text-[10px] text-[#9CA3AF]">{dest.processing}</p>
                  <p className="mt-1 text-xs font-semibold text-[#0057D9]">From {dest.price}</p>
                </div>
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
            <h2 className="section-title mx-auto max-w-xl">Your visa in 4 simple steps</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              We take the complexity out of visa applications — from document preparation to embassy submission.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                {/* Connector line */}
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
            <h2 className="section-title mx-auto max-w-xl">Expert assistance, every step</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Our visa specialists have helped thousands of travellers get approved — quickly and without stress.
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
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="Visa service includes"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Every application includes</p>
              <h2 className="section-title mt-2 max-w-md">Full service, one flat fee</h2>
              <p className="mt-3 text-sm text-[#475569]">
                Our service fee covers everything — no hidden embassy surcharges, no surprise add-ons.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Personalised document checklist",
                  "Expert review before submission",
                  "Direct embassy / consulate filing",
                  "Real-time application status updates",
                  "Re-application support if needed",
                  "Digital or courier visa delivery",
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
                  href="/packages"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
                >
                  View packages <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">FAQ</p>
            <h2 className="section-title mx-auto max-w-xl">Common visa questions</h2>
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
            <Tag className="h-3.5 w-3.5" /> Plan your trip end-to-end
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Visa sorted? Now book your stay.
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Complete your travel plan — book a luxury room at Huts4u and enjoy a seamless, fully sorted trip from visa to check-out.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rooms"
              className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              Browse hotel rooms
            </Link>
            <Link
              href="/flights"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Find flights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
