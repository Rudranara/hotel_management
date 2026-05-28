import Link from "next/link";
import {
  Shield, Heart, AlertTriangle, Phone, MapPin, Wifi, ShieldCheck, ArrowRight, CheckCircle, Sun, Zap,
} from "lucide-react";

export const metadata = {
  title: "Travel Safety | Huts4u",
  description: "Travel safely with Huts4u — health tips, personal security advice, emergency contacts, and verified property standards.",
};

const tips = [
  {
    icon: Heart,
    title: "Health & medical",
    items: [
      "Carry a basic first-aid kit and any prescription medicines",
      "Check health advisories for your destination before travel",
      "Purchase travel insurance that covers medical emergencies",
      "Stay hydrated and avoid street food in high-risk areas",
    ],
  },
  {
    icon: Shield,
    title: "Personal security",
    items: [
      "Share your itinerary with a trusted contact before departing",
      "Use hotel lockers for passports and valuables",
      "Avoid displaying expensive items like cameras or jewellery",
      "Use licensed taxis or app-based cabs — avoid unmarked vehicles",
    ],
  },
  {
    icon: Wifi,
    title: "Digital safety",
    items: [
      "Avoid using public Wi-Fi for payments or banking",
      "Enable two-factor authentication on your Huts4u account",
      "Never share your OTP, password, or booking ID with strangers",
      "Lock your devices with biometrics or a strong PIN",
    ],
  },
  {
    icon: Sun,
    title: "Environmental safety",
    items: [
      "Check weather forecasts and natural hazard advisories",
      "Follow all local laws and cultural norms",
      "Register with your country's consulate for long-duration trips",
      "Carry emergency cash in local currency for remote areas",
    ],
  },
];

export default function SafetyPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Your safety</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Travel safety guide</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Huts4u is committed to ensuring every trip is safe, comfortable, and worry-free. Here&apos;s everything you need to travel confidently.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-0 px-4 sm:grid-cols-4 sm:px-6 lg:px-10">
          {[
            { icon: ShieldCheck, value: "100%",  label: "Properties verified" },
            { icon: Shield,      value: "24 / 7", label: "Emergency support"   },
            { icon: Heart,       value: "4.8 ★",  label: "Safety rating"       },
            { icon: Zap,         value: "< 2 min", label: "Avg. response time" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 border-r border-[#E5E7EB] px-6 py-8 last:border-r-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF]">
                <Icon className="h-5 w-5 text-[#0057D9]" />
              </div>
              <p className="text-2xl font-extrabold text-[#0057D9]">{value}</p>
              <p className="text-sm text-[#6B7280]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety tips ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Safety tips</span>
            <h2 className="section-title mt-3">Stay safe while you travel</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {tips.map(({ icon: Icon, title, items }) => (
              <div key={title} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <p className="mt-4 text-lg font-bold text-[#1A2235]">{title}</p>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0057D9]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our standards ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="section-label">Our commitment</span>
              <h2 className="section-title mt-3">How Huts4u keeps you safe</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "All listed properties undergo a physical inspection before going live",
                  "Every booking is covered by our zero-liability payment guarantee",
                  "Dedicated 24/7 emergency helpline for guests in distress",
                  "Verified guest reviews to help you choose safe, quality properties",
                  "Instant cancellation and refunds if a property fails safety checks",
                  "Encrypted data storage — your personal details are never shared",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0057D9]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <AlertTriangle className="h-7 w-7 text-amber-500" />
                <p className="mt-3 font-bold text-[#1A2235]">Emergency contacts</p>
                <div className="mt-3 space-y-2 text-sm text-[#374151]">
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#0057D9]" /> Police: <span className="font-semibold">100</span></div>
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#0057D9]" /> Ambulance: <span className="font-semibold">108</span></div>
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#0057D9]" /> Huts4u helpline: <span className="font-semibold">1800-XXX-XXXX</span></div>
                </div>
              </div>
              <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <MapPin className="h-7 w-7 text-[#0057D9]" />
                <p className="mt-3 font-bold text-[#1A2235]">Share your location</p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Use the Huts4u app to share your live trip itinerary with a trusted contact — one tap from your booking page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-16">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Have a safety concern?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Our support team is available 24/7 for anything urgent. Don&apos;t hesitate to reach out.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/support" className="btn-primary inline-flex items-center gap-2">Contact us <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/insurance" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              <Shield className="h-4 w-4" /> Travel insurance
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
