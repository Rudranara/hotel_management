import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Huts4u",
  description: "Huts4u Terms & Conditions — rules for using our platform, making bookings, and your rights as a user.",
};

const sections = [
  {
    title: "1. Acceptance of terms",
    content: `By accessing or using the Huts4u website, mobile app, or any of our services, you agree to be bound by these Terms & Conditions ("Terms") and our Privacy Policy. If you do not agree, please do not use our services.

These Terms constitute a legally binding agreement between you ("User") and Huts4u Pvt. Ltd. ("Huts4u", "we", "us"). We reserve the right to update these Terms at any time with 14 days' notice.`,
  },
  {
    title: "2. User accounts",
    content: `• You must be at least 18 years old to create an account and make a booking.
• You are responsible for maintaining the confidentiality of your account credentials.
• You agree to provide accurate, current, and complete information during registration.
• You must notify us immediately of any unauthorised use of your account at security@huts4u.com.
• We reserve the right to suspend or terminate accounts that violate these Terms or are used fraudulently.`,
  },
  {
    title: "3. Bookings and payments",
    content: `• All bookings are subject to availability and confirmation by the property.
• Prices displayed are inclusive of applicable taxes unless stated otherwise.
• Bookings are confirmed only upon successful payment. An email confirmation will be sent within 5 minutes.
• We act as an intermediary between guests and properties. The contract for accommodation is between you and the property.
• We reserve the right to cancel a booking if payment fails or if fraud is suspected, with a full refund issued.
• Any pricing errors (e.g., incorrect room rates) will be communicated immediately and you will have the option to confirm or cancel at the correct price.`,
  },
  {
    title: "4. Cancellations and refunds",
    content: `Cancellation and refund terms depend on the booking type:

• Standard bookings: subject to our standard Cancellation Policy (see huts4u.com/cancellations).
• Non-refundable bookings: clearly marked at checkout. No refund will be issued under any circumstance.
• Property-initiated cancellations: you will receive a full refund within 3 business days.

Refunds are processed to the original payment method. Please allow 5–7 business days for card refunds.`,
  },
  {
    title: "5. User conduct",
    content: `You agree not to:

• Provide false information or impersonate another person
• Use our platform for fraudulent, illegal, or harmful activities
• Attempt to gain unauthorised access to any part of our systems
• Scrape, crawl, or automate access to our website without written permission
• Post reviews, content, or communications that are false, defamatory, abusive, or discriminatory
• Manipulate pricing by exploiting errors or using bots

Violation of these rules may result in immediate account termination and legal action.`,
  },
  {
    title: "6. Intellectual property",
    content: `All content on the Huts4u platform — including text, images, logos, UI design, and software — is owned by Huts4u Pvt. Ltd. or licensed to us. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.

User-submitted content (e.g., reviews, photos) remains your property. By submitting it, you grant us a worldwide, royalty-free licence to display and distribute it on our platform.`,
  },
  {
    title: "7. Limitation of liability",
    content: `To the maximum extent permitted by law:

• Huts4u is not liable for any indirect, incidental, or consequential loss arising from your use of our services.
• We are not liable for the actions, omissions, or quality of third-party properties listed on our platform.
• Our total liability to you in connection with any claim shall not exceed the amount you paid for the specific booking giving rise to the claim.
• We do not guarantee uninterrupted, error-free access to our platform.`,
  },
  {
    title: "8. Dispute resolution",
    content: `If you have a dispute with us, please contact us first at support@huts4u.com. We will attempt to resolve it within 14 business days.

If we cannot resolve the dispute informally, both parties agree to resolve it through binding arbitration under the Arbitration and Conciliation Act, 1996, in Bengaluru, India. Indian law governs these Terms.`,
  },
  {
    title: "9. Governing law",
    content: `These Terms are governed by and construed in accordance with the laws of India. You submit to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India for any dispute not resolved by arbitration.`,
  },
  {
    title: "10. Contact",
    content: `For questions about these Terms, contact us at:

Email: legal@huts4u.com
Post: Legal Team, Huts4u Pvt. Ltd., 123 Koramangala 5th Block, Bengaluru – 560095, India`,
  },
];

export default function TermsPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Legal</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Terms &amp; Conditions</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            The rules and agreement that govern your use of the Huts4u platform.
          </p>
          <p className="mt-3 text-sm text-white/40">Last updated: May 1, 2026</p>
        </div>
      </section>

      {/* ── Intro card ── */}
      <section className="bg-[#F7F9FC] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-start gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EEF4FF] p-6">
            <FileText className="mt-0.5 h-6 w-6 shrink-0 text-[#0057D9]" />
            <p className="text-sm text-[#1E3A8A]">
              <span className="font-semibold">Plain English summary:</span> Use our platform honestly, pay for bookings you make, follow our cancellation policy, and treat properties and other users with respect. We are not liable for third-party property actions. Indian law applies.
            </p>
          </div>
        </div>
      </section>

      {/* ── Terms content ── */}
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
          <h2 className="section-title relative text-white">Questions about our terms?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Reach our legal team or general support team — we&apos;re happy to explain anything.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:legal@huts4u.com" className="btn-primary inline-flex items-center gap-2">
              legal@huts4u.com <ArrowRight className="h-4 w-4" />
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
