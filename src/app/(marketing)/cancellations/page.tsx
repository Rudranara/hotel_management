import Link from "next/link";
import { AlertCircle, CheckCircle, ArrowRight, Clock, ShieldCheck, XCircle, Info } from "lucide-react";

export const metadata = {
  title: "Cancellation Policy | Huts4u",
  description: "Understand Huts4u's cancellation windows, refund timelines, and non-refundable booking rules.",
};

const tiers = [
  {
    window: "7+ days before check-in",
    refund: "100% refund",
    tag: "Full refund",
    tagColor: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  {
    window: "3–6 days before check-in",
    refund: "50% refund",
    tag: "Partial refund",
    tagColor: "bg-amber-50 text-amber-700",
    icon: Info,
    iconColor: "text-amber-500",
  },
  {
    window: "24–72 hours before check-in",
    refund: "25% refund",
    tag: "Partial refund",
    tagColor: "bg-orange-50 text-orange-700",
    icon: Info,
    iconColor: "text-orange-500",
  },
  {
    window: "Less than 24 hours / no-show",
    refund: "No refund",
    tag: "Non-refundable",
    tagColor: "bg-rose-50 text-rose-700",
    icon: XCircle,
    iconColor: "text-rose-500",
  },
];

const exceptions = [
  "Medical emergencies with a valid doctor's certificate issued within 48 hrs of cancellation",
  "Natural disasters, government-declared emergencies, or force majeure events",
  "Property-side cancellations or room unavailability — full refund guaranteed",
  "Duplicate bookings made within 1 hour of each other — full refund on the duplicate",
];

export default function CancellationsPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Policy</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Cancellation Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            We believe in fair, transparent cancellations. Here&apos;s exactly what to expect when you need to cancel a booking.
          </p>
          <p className="mt-3 text-sm text-white/40">Last updated: May 1, 2026</p>
        </div>
      </section>

      {/* ── Cancellation tiers ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <span className="section-label">Standard policy</span>
          <h2 className="section-title mt-3">Cancellation windows &amp; refunds</h2>
          <p className="mt-3 text-[#6B7280]">
            The standard policy below applies to all bookings unless the property specifies a stricter policy on the room listing page. Always check the room detail page before booking.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map(({ window, refund, tag, tagColor, icon: Icon, iconColor }) => (
              <div key={window} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <Icon className={`h-8 w-8 ${iconColor}`} />
                <p className="mt-4 font-bold text-[#1A2235]">{window}</p>
                <p className={`mt-2 text-2xl font-extrabold text-[#1A2235]`}>{refund}</p>
                <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${tagColor}`}>{tag}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Non-refundable bookings:</span> Some room types are offered at a discounted rate with a non-refundable policy. These are clearly marked with a "Non-refundable" badge on the booking page. No refund will be issued under any circumstance for these bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to cancel ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <span className="section-label">Step by step</span>
          <h2 className="section-title mt-3">How to cancel a booking</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { step: "1", title: "Go to My Bookings",     desc: "Log in to your dashboard and navigate to My Bookings. Find the booking you want to cancel." },
              { step: "2", title: 'Click "Cancel booking"', desc: 'Open the booking detail and tap the "Cancel booking" button. You\'ll see a preview of your refund amount.' },
              { step: "3", title: "Confirm & receive refund", desc: "Confirm the cancellation. Your refund will be processed within 5–7 business days to the original payment method." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0057D9] text-sm font-extrabold text-white">{step}</div>
                <p className="mt-4 font-bold text-[#1A2235]">{title}</p>
                <p className="mt-2 text-sm text-[#6B7280]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exceptions ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="section-label">Special circumstances</span>
              <h2 className="section-title mt-3">Exceptions &amp; waivers</h2>
              <p className="mt-4 text-[#6B7280]">
                We review cancellation waiver requests on a case-by-case basis for the following circumstances. Contact our support team within 24 hrs of the cancellation request.
              </p>
              <ul className="mt-6 space-y-3">
                {exceptions.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-[#374151]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0057D9]" /> {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] p-7">
              <ShieldCheck className="h-10 w-10 text-[#0057D9]" />
              <h3 className="mt-4 text-xl font-bold text-[#1A2235]">Travel insurance tip</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                Purchase our Travel Insurance add-on at checkout to cover cancellations due to illness, flight delays, or unforeseen events — regardless of the booking&apos;s cancellation policy.
              </p>
              <Link href="/insurance" className="btn-primary mt-5 inline-flex items-center gap-2">
                Explore insurance <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-16">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Need help with a cancellation?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Our support team is available 24/7 to help you cancel or modify your booking.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/support" className="btn-primary inline-flex items-center gap-2">Contact support <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              <Clock className="h-4 w-4" /> View my bookings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
