import Image from "next/image";
import Link from "next/link";
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle,
  Tag,
  BookOpen,
  HelpCircle,
  AlertCircle,
  Users,
  FileText,
  LifeBuoy,
} from "lucide-react";

export const metadata = {
  title: "Support | Huts4u",
  description:
    "Get help with your bookings, payments, and account — live chat, email, and phone support available 24/7.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const contactOptions = [
  {
    icon: MessageCircle,
    label: "Live Chat",
    sub: "Typical reply in under 2 min",
    badge: "Fastest",
    badgeColor: "bg-[#16A34A] text-white",
    cta: "Start chat",
    href: "#chat",
    available: "24 / 7",
  },
  {
    icon: Phone,
    label: "Call Us",
    sub: "+91 1800-XXX-XXXX (toll-free)",
    badge: "Recommended",
    badgeColor: "bg-[#FF6B35] text-white",
    cta: "Call now",
    href: "tel:+911800000000",
    available: "8 AM – 10 PM",
  },
  {
    icon: Mail,
    label: "Email Support",
    sub: "support@huts4u.com",
    badge: "All queries",
    badgeColor: "bg-[#0057D9] text-white",
    cta: "Send email",
    href: "mailto:support@huts4u.com",
    available: "Reply within 4 hrs",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "Chat with us on WhatsApp",
    badge: "Quick & easy",
    badgeColor: "bg-[#7C3AED] text-white",
    cta: "Open WhatsApp",
    href: "https://wa.me/911800000000",
    available: "24 / 7",
  },
];

const popularTopics = [
  { icon: BookOpen,    label: "Booking & Reservations",  desc: "Modify, cancel, or check the status of your room or travel bookings.",   href: "#bookings" },
  { icon: FileText,    label: "Payments & Refunds",       desc: "Payment failures, refund timelines, and transaction disputes.",          href: "#payments" },
  { icon: Users,       label: "Account & Profile",        desc: "Password reset, profile updates, and login issues.",                     href: "#account"  },
  { icon: LifeBuoy,    label: "Travel Insurance Claims",  desc: "How to file a claim and track your reimbursement status.",               href: "#insurance" },
  { icon: Headphones,  label: "Visa Assistance",          desc: "Application status, document queries, and resubmission guidance.",       href: "#visa"     },
  { icon: Zap,         label: "Technical Issues",         desc: "App crashes, website errors, and payment gateway problems.",             href: "#tech"     },
];

const faqs = [
  {
    q: "How do I cancel or modify my booking?",
    a: "Go to Dashboard → My Bookings, select the booking, and click 'Cancel' or 'Modify'. Cancellations made more than 48 hours before check-in receive a full refund. Modifications are free up to 24 hours before check-in.",
  },
  {
    q: "When will I receive my refund?",
    a: "Refunds are processed within 5–7 working days to your original payment method. UPI and net banking refunds usually arrive in 2–3 business days. You'll receive an email confirmation once initiated.",
  },
  {
    q: "My payment failed but the amount was deducted — what do I do?",
    a: "This is usually a temporary bank hold that is auto-reversed within 3–5 business days. If not reversed, contact us via live chat with your transaction reference and we'll resolve it within 24 hours.",
  },
  {
    q: "How do I download my booking confirmation / invoice?",
    a: "Log in → Dashboard → My Bookings → select the booking → click 'Download Invoice'. Your e-ticket and GST invoice are available as a PDF download.",
  },
  {
    q: "I haven't received my confirmation email — what should I do?",
    a: "Check your spam / junk folder first. If it's not there, log in to your dashboard to verify the booking status. You can resend the confirmation email from the booking detail page.",
  },
  {
    q: "Can I change the name on my booking?",
    a: "Name changes on hotel bookings can be requested up to 24 hours before check-in at no charge. For flights and trains, name changes depend on the operator's policy — contact us for assistance.",
  },
];

const features = [
  { icon: Clock,        label: "24 / 7 live chat",        sub: "Always available, no hold music" },
  { icon: ShieldCheck,  label: "Secure & private",         sub: "Your data is never shared" },
  { icon: Star,         label: "4.8 / 5 satisfaction",    sub: "Based on 12,000+ support ratings" },
  { icon: Zap,          label: "Fast resolution",          sub: "90% of issues resolved in first contact" },
];

const resources = [
  { icon: BookOpen,  label: "Help Centre",           sub: "Step-by-step guides for every feature",  href: "#help"     },
  { icon: FileText,  label: "Cancellation Policy",   sub: "Full terms and refund schedule",          href: "#policy"   },
  { icon: ShieldCheck, label: "Privacy Policy",      sub: "How we store and use your data",          href: "#privacy"  },
  { icon: HelpCircle, label: "Terms & Conditions",   sub: "User agreement and platform rules",       href: "#terms"    },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=2400&q=80"
          alt="Support team"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,22,40,0.88)_0%,rgba(0,87,217,0.50)_60%,rgba(0,87,217,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Headphones className="h-3 w-3" /> Support
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            We&apos;re here to help,<br />
            <span className="text-[#FF6B35]">always.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Live chat, email, and phone support — real people, fast answers, 24 hours a day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: MessageCircle, label: "Live chat 24/7" },
              { icon: Star,          label: "4.8 / 5 satisfaction" },
              { icon: Zap,           label: "Most issues resolved in 1 contact" },
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
            { icon: MessageCircle, label: "Live chat 24/7",       sub: "Under 2 min average reply" },
            { icon: Phone,         label: "Toll-free helpline",   sub: "+91 1800-XXX-XXXX" },
            { icon: Star,          label: "4.8 / 5 rating",       sub: "From 12,000+ reviews" },
            { icon: Zap,           label: "90% first-contact fix", sub: "Fast, effective resolutions" },
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

      {/* ── Contact options ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" /> Contact Us
            </p>
            <h2 className="section-title mx-auto max-w-xl">Reach us your way</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Choose the channel that works best for you — we respond fast on all of them.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactOptions.map((opt) => (
              <div
                key={opt.label}
                className="card-lift group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:border-[#DBEAFE]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                    <opt.icon className="h-5 w-5 text-[#0057D9]" />
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${opt.badgeColor}`}>
                    {opt.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1A2235] transition group-hover:text-[#0057D9]">
                  {opt.label}
                </h3>
                <p className="mt-1 text-sm text-[#475569]">{opt.sub}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <Clock className="h-3 w-3" /> {opt.available}
                </p>
                <a
                  href={opt.href}
                  className="mt-5 flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.30)] transition hover:bg-[#E55A24] w-fit"
                >
                  {opt.cta} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular topics ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Browse Topics</p>
            <h2 className="section-title mx-auto max-w-xl">What do you need help with?</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Find guides and answers for the most common questions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map(({ icon: Icon, label, desc, href }) => (
              <a
                key={label}
                href={href}
                className="card-lift group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:border-[#DBEAFE]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] transition group-hover:bg-[#DBEAFE]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A2235] transition group-hover:text-[#0057D9]">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why our support ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Why choose us</p>
            <h2 className="section-title mx-auto max-w-xl">Support you can count on</h2>
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

      {/* ── What we can help with split card ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md lg:flex">
            <div className="relative h-64 shrink-0 lg:h-auto lg:w-[45%]">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
                alt="Support team at work"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="section-label">Every issue, handled</p>
              <h2 className="section-title mt-2 max-w-md">Full support across all services</h2>
              <p className="mt-3 text-sm text-[#475569]">
                Whether it&apos;s a booking question or a payment dispute — our team resolves it, fast.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Hotel, flight, train, bus & cab bookings",
                  "Visa application status & document help",
                  "Insurance claims & policy queries",
                  "Payment failures, refunds & invoices",
                  "Account access, profile & security",
                  "Special requests & accessibility needs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#1A2235]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#0057D9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#chat"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] transition hover:bg-[#E55A24]"
                >
                  <MessageCircle className="h-4 w-4" /> Start live chat
                </a>
                <a
                  href="mailto:support@huts4u.com"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A2235] transition hover:border-[#DBEAFE] hover:text-[#0057D9]"
                >
                  Email us <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7F9FC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">FAQ</p>
            <h2 className="section-title mx-auto max-w-xl">Frequently asked questions</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#475569]">
              Quick answers to the questions we hear most often.
            </p>
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

      {/* ── Resources ── */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="section-label justify-center">Resources</p>
            <h2 className="section-title mx-auto max-w-xl">Helpful links & policies</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map(({ icon: Icon, label, sub, href }) => (
              <a
                key={label}
                href={href}
                className="card-lift group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:border-[#DBEAFE]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] transition group-hover:bg-[#DBEAFE]">
                  <Icon className="h-5 w-5 text-[#0057D9]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A2235] transition group-hover:text-[#0057D9]">{label}</p>
                  <p className="mt-1 text-sm text-[#64748B]">{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#FF6B35]">
            <Tag className="h-3.5 w-3.5" /> We&apos;re here for you
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Couldn&apos;t find your answer?
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Our support team is online right now — start a live chat or send us an email and we&apos;ll get back to you fast.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#chat"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,107,53,0.40)] transition hover:bg-[#E55A24]"
            >
              <MessageCircle className="h-4 w-4" /> Start live chat
            </a>
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Browse rooms <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
