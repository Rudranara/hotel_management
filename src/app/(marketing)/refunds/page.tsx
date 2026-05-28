import Link from "next/link";
import { CheckCircle, Clock, CreditCard, ArrowRight, AlertCircle, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Refund Policy | Huts4u",
  description: "Learn how and when Huts4u processes refunds — timelines, methods, and what to do if you haven't received yours.",
};

const refundMethods = [
  { method: "Original card / net banking",  timeline: "5–7 business days",  icon: CreditCard  },
  { method: "UPI",                           timeline: "1–3 business days",  icon: Zap         },
  { method: "Travel Wallet",                 timeline: "Instant",            icon: ShieldCheck },
];

const faq = [
  {
    q: "When will I receive my refund?",
    a: "Refunds are initiated within 24 hrs of cancellation. The time to reach your account depends on your payment method — typically 1–7 business days.",
  },
  {
    q: "Can I get a refund to a different account?",
    a: "No. Refunds are always processed to the original payment method used at checkout. We cannot redirect refunds to a different card or account.",
  },
  {
    q: "What if my refund is delayed beyond 7 business days?",
    a: "Contact our support team with your booking ID. We will raise a query with the payment processor and keep you updated within 1 business day.",
  },
  {
    q: "Can I convert my refund to Travel Wallet credit?",
    a: "Yes — and it's faster too. When cancelling, choose 'Refund to Travel Wallet' for an instant credit you can use on any future booking.",
  },
  {
    q: "Are booking fees and service charges refundable?",
    a: "Platform service fees are non-refundable. The room rate (including taxes) is refunded according to the applicable cancellation policy.",
  },
];

export default function RefundsPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Policy</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Refund Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Refunds are processed promptly and transparently. Here&apos;s everything you need to know.
          </p>
          <p className="mt-3 text-sm text-white/40">Last updated: May 1, 2026</p>
        </div>
      </section>

      {/* ── Refund timelines ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <span className="section-label">Timelines</span>
          <h2 className="section-title mt-3">How long will my refund take?</h2>
          <p className="mt-3 text-[#6B7280]">
            We initiate all refunds within 24 hours of a confirmed cancellation. Actual receipt depends on your payment method and bank.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {refundMethods.map(({ method, timeline, icon: Icon }) => (
              <div key={method} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <p className="mt-4 font-bold text-[#1A2235]">{method}</p>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <Clock className="h-3.5 w-3.5" /> {timeline}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#BFDBFE] bg-[#EEF4FF] p-5">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0057D9]" />
              <p className="text-sm text-[#1E3A8A]">
                <span className="font-semibold">Tip:</span> Choosing "Refund to Travel Wallet" at cancellation is always the fastest option — it&apos;s instant and can be applied to your next booking immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to claim ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <span className="section-label">Process</span>
          <h2 className="section-title mt-3">How to claim your refund</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { step: "1", title: "Cancel your booking",    desc: "Go to My Bookings → select booking → Cancel. Choose your preferred refund destination." },
              { step: "2", title: "Receive confirmation",   desc: "You'll get a cancellation confirmation email with the refund amount and expected timeline." },
              { step: "3", title: "Track the refund",       desc: "Check your bank or Travel Wallet. If delayed, contact support with your booking ID." },
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

      {/* ── What's not refundable ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="section-label">Non-refundable items</span>
              <h2 className="section-title mt-3">What is not refunded?</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Platform service fees and convenience charges",
                  "Non-refundable room bookings (clearly labelled at checkout)",
                  "Visa or insurance add-ons once processing has begun",
                  "Late cancellations falling outside the property's free cancellation window",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="section-label">What is always refunded?</span>
              <h2 className="section-title mt-3">Your guaranteed refunds</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Cancellations within the free cancellation window",
                  "Property-initiated cancellations or room unavailability",
                  "Duplicate bookings cancelled within 1 hour",
                  "Approved waiver requests (medical / force majeure)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0057D9]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Common questions</span>
            <h2 className="section-title mt-3">Refund FAQs</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-5">
            {faq.map(({ q, a }) => (
              <div key={q} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <p className="font-bold text-[#1A2235]">{q}</p>
                <p className="mt-2 text-sm text-[#6B7280]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-16">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Refund not arrived yet?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Our team will track it down and keep you updated within 1 business day.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/support" className="btn-primary inline-flex items-center gap-2">Contact support <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/cancellations" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Cancellation policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
