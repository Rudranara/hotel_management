import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Huts4u",
  description: "Huts4u Privacy Policy — how we collect, use, store, and protect your personal data.",
};

const sections = [
  {
    title: "1. Information we collect",
    content: `We collect information you provide directly when you create an account, make a booking, or contact our support team. This includes:

• Identity data: name, date of birth, nationality, government ID (where required for booking)
• Contact data: email address, phone number, postal address
• Payment data: card details (stored securely via our PCI-DSS-compliant payment processor — we never store raw card numbers), UPI IDs
• Booking data: properties visited, dates, guest count, special requests
• Profile data: saved preferences, wishlist items, review history
• Usage data: pages visited, features used, device and browser information, IP address
• Communication data: support chat transcripts, emails, survey responses`,
  },
  {
    title: "2. How we use your data",
    content: `We use your personal data for the following purposes:

• To process and manage your bookings and payments
• To send booking confirmations, reminders, and updates
• To provide customer support and resolve disputes
• To personalise your experience (e.g., recommended stays, saved preferences)
• To send promotional offers and newsletters (only with your consent)
• To improve our platform, detect fraud, and maintain security
• To comply with legal obligations including tax reporting and anti-money-laundering regulations`,
  },
  {
    title: "3. Data sharing",
    content: `We do not sell your personal data. We share it only in the following limited circumstances:

• With property partners: we share your name, contact number, and booking details with the property you have booked. They are bound by confidentiality obligations.
• With payment processors: your payment data is processed by RBI-authorised processors (e.g., Razorpay, Stripe). We do not store card details.
• With service providers: we use third-party services for email delivery, analytics, and fraud detection. All are bound by data processing agreements.
• For legal compliance: we may disclose data when required by law, court order, or to protect the rights and safety of our users or the public.`,
  },
  {
    title: "4. Data retention",
    content: `We retain your personal data for as long as necessary to provide our services and comply with legal obligations:

• Account data: retained for the life of your account plus 3 years after closure
• Booking records: retained for 7 years for tax and accounting purposes
• Payment data: retained per PCI-DSS requirements (typically 3 years)
• Marketing preferences: retained until you withdraw consent

You may request deletion of your account and personal data at any time (see Section 6).`,
  },
  {
    title: "5. Cookies & tracking",
    content: `We use cookies and similar tracking technologies to:

• Keep you logged in across sessions
• Remember your preferences and search history
• Analyse site performance and user behaviour
• Serve relevant advertisements (with your consent)

You can manage cookie preferences at any time. See our Cookie Policy for full details.`,
  },
  {
    title: "6. Your rights",
    content: `Under applicable data protection law you have the right to:

• Access: request a copy of the personal data we hold about you
• Rectification: ask us to correct inaccurate or incomplete data
• Erasure: request deletion of your personal data ("right to be forgotten")
• Portability: receive your data in a structured, machine-readable format
• Objection: object to processing based on legitimate interests or for direct marketing
• Withdraw consent: unsubscribe from marketing at any time (unsubscribe link in every email)

To exercise any right, email privacy@huts4u.com. We will respond within 30 days.`,
  },
  {
    title: "7. Security",
    content: `We take security seriously and implement industry-standard measures including:

• TLS/HTTPS encryption on all data in transit
• AES-256 encryption for sensitive data at rest
• Regular third-party penetration testing
• Role-based access control — employees only access data necessary for their role
• Two-factor authentication for all internal systems

No method of transmission or storage is 100% secure. If you suspect a security breach involving your account, contact security@huts4u.com immediately.`,
  },
  {
    title: "8. International transfers",
    content: `Huts4u is based in India and primarily processes data within India. If we transfer your data to third-party processors outside India, we ensure adequate protections are in place (e.g., Standard Contractual Clauses or equivalent safeguards) as required under applicable law.`,
  },
  {
    title: "9. Children's privacy",
    content: `Our services are not directed at children under 13 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact privacy@huts4u.com and we will delete it promptly.`,
  },
  {
    title: "10. Changes to this policy",
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or via an in-app notification at least 14 days before the changes take effect. The date at the top of this page reflects the latest revision.`,
  },
  {
    title: "11. Contact",
    content: `For any privacy-related questions, requests, or complaints, contact our Data Protection Officer:

Email: privacy@huts4u.com
Post: Data Protection Officer, Huts4u Pvt. Ltd., 123 Koramangala 5th Block, Bengaluru – 560095, India`,
  },
];

export default function PrivacyPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Legal</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            How Huts4u collects, uses, and protects your personal data.
          </p>
          <p className="mt-3 text-sm text-white/40">Last updated: May 1, 2026</p>
        </div>
      </section>

      {/* ── Intro card ── */}
      <section className="bg-[#F7F9FC] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-start gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EEF4FF] p-6">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#0057D9]" />
            <p className="text-sm text-[#1E3A8A]">
              <span className="font-semibold">Summary:</span> We collect data to run our service and improve your experience. We never sell your data. You can request access, correction, or deletion at any time. Questions? Email{" "}
              <a href="mailto:privacy@huts4u.com" className="underline">privacy@huts4u.com</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Policy content ── */}
      <section className="bg-white py-12 pb-20">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-10">
          {sections.map(({ title, content }) => (
            <div key={title}>
              <h2 className="text-lg font-bold text-[#1A2235]">{title}</h2>
              <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#6B7280]">{content}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-16">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Questions about your data?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Email our Data Protection Officer or visit our contact page.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:privacy@huts4u.com" className="btn-primary inline-flex items-center gap-2">
              privacy@huts4u.com <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
