import Link from "next/link";
import {
  Newspaper, Download, ArrowRight, Mail, ExternalLink, Zap, Globe, Award,
} from "lucide-react";

export const metadata = {
  title: "Press | Huts4u",
  description: "Press releases, media coverage, brand assets, and media contact for Huts4u.",
};

const pressReleases = [
  {
    id: "p1", date: "May 15, 2026",
    title: "Huts4u crosses 50,000 bookings milestone",
    summary: "India's fastest-growing hotel booking platform announces it has processed over 50,000 confirmed bookings since launch, driven by strong demand in leisure travel.",
  },
  {
    id: "p2", date: "March 8, 2026",
    title: "Huts4u launches Travel Wallet with instant cashback",
    summary: "The new Travel Wallet feature lets users store credit, earn up to 5% cashback on every booking, and pay instantly at checkout — no OTP, no redirect.",
  },
  {
    id: "p3", date: "January 20, 2026",
    title: "Series A fundraise of ₹12 Cr from Horizon Ventures",
    summary: "Huts4u secures ₹12 crore in Series A funding to accelerate property listings, expand to South-East Asia, and double its engineering team.",
  },
  {
    id: "p4", date: "October 4, 2025",
    title: "Huts4u partners with 200+ boutique properties across India",
    summary: "An exclusive partnership programme brings over 200 hand-picked boutique hotels, homestays, and eco-lodges onto the platform, giving travellers access to unique off-the-beaten-path stays.",
  },
];

const coverage = [
  { outlet: "YourStory",      logo: "YS",  href: "#" },
  { outlet: "Inc42",          logo: "42",  href: "#" },
  { outlet: "Mint",           logo: "M",   href: "#" },
  { outlet: "The Hindu BL",   logo: "TH",  href: "#" },
  { outlet: "Economic Times", logo: "ET",  href: "#" },
  { outlet: "TechCrunch IN",  logo: "TC",  href: "#" },
];

export default function PressPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Newsroom</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Huts4u in the press</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Press releases, media coverage, and brand assets. For media enquiries contact{" "}
            <a href="mailto:press@huts4u.com" className="font-semibold text-[#FF6B35] hover:underline">press@huts4u.com</a>
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 px-4 sm:px-6 lg:px-10">
          {[
            { icon: Award, value: "2021", label: "Founded" },
            { icon: Globe, value: "120+", label: "Destinations" },
            { icon: Zap,   value: "₹12 Cr", label: "Series A raised" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 border-r border-[#E5E7EB] px-6 py-8 last:border-r-0">
              <Icon className="mb-1 h-5 w-5 text-[#0057D9]" />
              <p className="text-2xl font-extrabold text-[#0057D9]">{value}</p>
              <p className="text-sm text-[#6B7280]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Press releases ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <span className="section-label">Latest news</span>
          <h2 className="section-title mt-3">Press releases</h2>
          <div className="mt-10 space-y-5">
            {pressReleases.map((pr) => (
              <div key={pr.id} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">{pr.date}</p>
                <h3 className="mt-1.5 text-lg font-bold text-[#1A2235]">{pr.title}</h3>
                <p className="mt-2 text-sm text-[#6B7280]">{pr.summary}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0057D9] hover:underline">
                  Read full release <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">As seen in</span>
            <h2 className="section-title mt-3">Media coverage</h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {coverage.map((c) => (
              <a key={c.outlet} href={c.href} className="flex h-16 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-8 text-lg font-extrabold text-[#6B7280] shadow-sm transition hover:border-[#0057D9] hover:text-[#0057D9]">
                {c.outlet}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media kit + contact ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF]">
                <Download className="h-6 w-6 text-[#0057D9]" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1A2235]">Media kit</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                Download our brand guidelines, logo files (SVG/PNG), product screenshots, and founder headshots.
              </p>
              <a href="#" className="btn-primary mt-6 inline-flex items-center gap-2">
                <Download className="h-4 w-4" /> Download kit (4.2 MB)
              </a>
            </div>
            <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF]">
                <Mail className="h-6 w-6 text-[#0057D9]" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1A2235]">Media contact</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                For interviews, quotes, data requests, or press accreditation, reach our communications team directly.
              </p>
              <a href="mailto:press@huts4u.com" className="btn-primary mt-6 inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> press@huts4u.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Want to feature Huts4u?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">We welcome interviews, case studies, and media partnerships. Get in touch.</p>
          <a href="mailto:press@huts4u.com" className="btn-primary mt-8 inline-flex items-center gap-2">
            Contact press team <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
