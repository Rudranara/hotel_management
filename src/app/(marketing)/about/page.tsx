import Image from "next/image";
import Link from "next/link";
import {
  Users, Star, MapPin, Award, Heart, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "About Us | Huts4u",
  description: "Learn about Huts4u — our story, mission, and the team behind India's fastest-growing travel platform.",
};

const stats = [
  { value: "50,000+", label: "Happy guests" },
  { value: "500+",    label: "Properties listed" },
  { value: "120+",    label: "Destinations" },
  { value: "4.8 ★",  label: "Average rating" },
];

const values = [
  { icon: Heart,      title: "Guest-first always",   desc: "Every decision starts with one question: does this make our guests' experience better?" },
  { icon: ShieldCheck,title: "Transparency",          desc: "No hidden charges, no bait-and-switch pricing. What you see is exactly what you pay." },
  { icon: Zap,        title: "Speed & simplicity",   desc: "Booking should take seconds, not minutes. We obsess over every friction point." },
  { icon: Globe,      title: "Responsible travel",   desc: "We partner only with eco-conscious properties and promote sustainable tourism." },
];

const team = [
  { name: "Rahul Mehta",    role: "Co-founder & CEO",        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Priya Sharma",   role: "Co-founder & CTO",        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
  { name: "Aryan Kapoor",   role: "Head of Product",         img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Nisha Patel",    role: "Head of Guest Experience", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[460px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
          alt="Huts4u team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-10">
          <span className="section-label mb-4 !text-[#FF6B35]">Our story</span>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Travel made simple,<br />memories made forever
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg">
            Huts4u was born from a simple belief — booking a great stay should be effortless, affordable, and trustworthy.
          </p>
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

      {/* ── Story ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="section-label">Who we are</span>
              <h2 className="section-title mt-3">Built by travellers,<br />for travellers</h2>
              <p className="mt-5 text-[#6B7280]">
                Founded in 2021 in Bengaluru, Huts4u started as a small team of four travel enthusiasts frustrated by clunky booking platforms and hidden fees. We set out to build something better — a platform where discovering and booking unique stays is as enjoyable as the trip itself.
              </p>
              <p className="mt-4 text-[#6B7280]">
                Today we serve over 50,000 travellers across India and are expanding to South-East Asia. Every feature we build, every property we list, and every policy we write is guided by one thing: making your travel experience genuinely great.
              </p>
              <ul className="mt-6 space-y-2">
                {["ISO-certified security practices", "RBI-authorised payment processing", "Carbon-offset programme since 2023"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-72 overflow-hidden rounded-3xl shadow-xl lg:h-96">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Huts4u office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">What drives us</span>
            <h2 className="section-title mt-3">Our values</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Team ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">The people behind Huts4u</span>
            <h2 className="section-title mt-3">Meet the team</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl shadow-md">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <p className="mt-4 font-bold text-[#1A2235]">{member.name}</p>
                <p className="mt-1 text-sm text-[#6B7280]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Join us</span>
          <h2 className="section-title relative mt-3 text-white">Ready to explore the world?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Over 50,000 travellers trust Huts4u for unforgettable stays. Be the next.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/rooms" className="btn-primary inline-flex items-center gap-2">
              Browse stays <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/careers" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              <Users className="h-4 w-4" /> Join our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
