import Link from "next/link";
import {
  Briefcase, MapPin, ArrowRight, Heart, Zap, Users, Star, Globe, TrendingUp, Coffee,
} from "lucide-react";

export const metadata = {
  title: "Careers | Huts4u",
  description: "Join the Huts4u team and help shape the future of travel in India.",
};

const perks = [
  { icon: Globe,      title: "Remote-friendly",     desc: "Work from anywhere in India. Our team spans 8 cities." },
  { icon: TrendingUp, title: "Fast growth",          desc: "3× year-on-year growth means real ownership and impact." },
  { icon: Heart,      title: "Travel allowance",     desc: "₹50,000 annual travel credit to explore and stay at properties on our platform." },
  { icon: Coffee,     title: "Great benefits",       desc: "Health insurance, flexible hours, and an annual offsite for the whole team." },
  { icon: Star,       title: "Learning budget",      desc: "₹25,000 per year for courses, conferences, and books — no approval needed." },
  { icon: Users,      title: "Inclusive culture",    desc: "Flat hierarchy, diverse team, and zero tolerance for any form of discrimination." },
];

const openings = [
  { id: "j1", title: "Senior Frontend Engineer",      dept: "Engineering",  location: "Bengaluru / Remote", type: "Full-time" },
  { id: "j2", title: "Backend Engineer (Node.js)",     dept: "Engineering",  location: "Remote",             type: "Full-time" },
  { id: "j3", title: "Product Designer (UX)",          dept: "Design",       location: "Bengaluru / Remote", type: "Full-time" },
  { id: "j4", title: "Growth Marketing Manager",       dept: "Marketing",    location: "Mumbai / Remote",    type: "Full-time" },
  { id: "j5", title: "Partner Relations Executive",    dept: "Partnerships", location: "Multiple cities",    type: "Full-time" },
  { id: "j6", title: "Customer Experience Associate",  dept: "Support",      location: "Remote",             type: "Contract"  },
];

const deptColors: Record<string, string> = {
  Engineering:  "bg-[#EEF4FF] text-[#0057D9]",
  Design:       "bg-violet-50 text-violet-600",
  Marketing:    "bg-amber-50 text-amber-600",
  Partnerships: "bg-emerald-50 text-emerald-600",
  Support:      "bg-[#22C7C7]/10 text-[#22C7C7]",
};

export default function CareersPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">We&apos;re hiring</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">
            Build the future of travel
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            We&apos;re a small, passionate team on a big mission. If you love travel, technology, and building things that genuinely help people — you&apos;ll fit right in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#openings" className="btn-primary inline-flex items-center gap-2">
              See open roles <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Learn about us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Why Huts4u</span>
            <h2 className="section-title mt-3">Life at Huts4u</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Open roles ── */}
      <section id="openings" className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Current openings</span>
            <h2 className="section-title mt-3">Open positions</h2>
          </div>
          <div className="mt-12 space-y-4">
            {openings.map((job) => (
              <div key={job.id} className="card-lift flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF]">
                    <Briefcase className="h-5 w-5 text-[#0057D9]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2235]">{job.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${deptColors[job.dept] ?? "bg-slate-50 text-slate-600"}`}>{job.dept}</span>
                      <span className="rounded-full bg-[#F7F9FC] px-2.5 py-0.5 text-xs font-semibold text-[#6B7280]">{job.type}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={`mailto:careers@huts4u.com?subject=Application: ${encodeURIComponent(job.title)}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0057D9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0048B8]"
                >
                  Apply now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#9CA3AF]">
            Don&apos;t see a role that fits? Email us at{" "}
            <a href="mailto:careers@huts4u.com" className="font-semibold text-[#0057D9] hover:underline">careers@huts4u.com</a>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Ready to make a difference?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Join 40+ talented people building India&apos;s most-loved travel platform.
          </p>
          <a href="mailto:careers@huts4u.com" className="btn-primary mt-8 inline-flex items-center gap-2">
            Send us your CV <Zap className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
