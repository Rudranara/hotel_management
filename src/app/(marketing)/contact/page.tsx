import Link from "next/link";
import {
  Mail, Phone, MessageCircle, MapPin, Clock, ArrowRight, Headphones, Send,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Huts4u",
  description: "Get in touch with the Huts4u team — we're available 24/7 via live chat, email, and phone.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "Live chat",
    sub: "Fastest — typically under 2 min",
    badge: "24 / 7",
    badgeColor: "bg-emerald-100 text-emerald-700",
    info: "Available in-app and on the website",
    cta: "Start chat",
    href: "#chat",
  },
  {
    icon: Phone,
    title: "Phone",
    sub: "Speak to a real person",
    badge: "24 / 7",
    badgeColor: "bg-emerald-100 text-emerald-700",
    info: "1800-XXX-XXXX (Toll-free India)",
    cta: "Call now",
    href: "tel:1800XXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    sub: "Detailed queries & documentation",
    badge: "< 4 hr reply",
    badgeColor: "bg-[#EEF4FF] text-[#0057D9]",
    info: "support@huts4u.com",
    cta: "Send email",
    href: "mailto:support@huts4u.com",
  },
  {
    icon: Headphones,
    title: "WhatsApp",
    sub: "Quick updates on bookings",
    badge: "9 AM – 11 PM",
    badgeColor: "bg-amber-50 text-amber-700",
    info: "+91 98765 XXXXX",
    cta: "Message us",
    href: "https://wa.me/919876500000",
  },
];

const offices = [
  { city: "Bengaluru (HQ)", address: "123, Koramangala 5th Block, Bengaluru – 560095" },
  { city: "Mumbai",          address: "456, Lower Parel West, Mumbai – 400013"          },
];

export default function ContactPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Get in touch</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            We&apos;re here around the clock. Choose the channel that works best for you.
          </p>
        </div>
      </section>

      {/* ── Channels ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Contact channels</span>
            <h2 className="section-title mt-3">How can we help?</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ icon: Icon, title, sub, badge, badgeColor, info, cta, href }) => (
              <div key={title} className="card-lift flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF]">
                  <Icon className="h-6 w-6 text-[#0057D9]" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <p className="font-bold text-[#1A2235]">{title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeColor}`}>{badge}</span>
                </div>
                <p className="mt-1 text-xs text-[#6B7280]">{sub}</p>
                <p className="mt-3 flex-1 text-sm font-medium text-[#374151]">{info}</p>
                <a href={href} className="btn-primary mt-5 inline-flex items-center justify-center gap-2">
                  {cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="section-label">Send a message</span>
              <h2 className="section-title mt-3">Write to us</h2>
              <p className="mt-3 text-[#6B7280]">
                Fill in the form and we&apos;ll get back to you within 4 hours. For urgent issues please use live chat or phone.
              </p>

              <form action="mailto:support@huts4u.com" method="GET" className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-[#374151]">Full name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Arjun Sharma"
                      className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#374151] outline-none focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-[#374151]">Email address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="arjun@email.com"
                      className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#374151] outline-none focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#374151]">Subject</label>
                  <select className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#374151] outline-none focus:border-[#0057D9]">
                    <option>Booking issue</option>
                    <option>Refund or cancellation</option>
                    <option>Payment problem</option>
                    <option>Property complaint</option>
                    <option>Partnership enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#374151]">Message</label>
                  <textarea
                    name="body"
                    rows={5}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full resize-none rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#374151] outline-none focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/20"
                  />
                </div>
                <button type="submit" className="btn-primary inline-flex items-center gap-2">
                  <Send className="h-4 w-4" /> Send message
                </button>
              </form>
            </div>

            {/* Right col — offices + hours */}
            <div className="space-y-5 lg:pt-16">
              <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] p-6">
                <Clock className="h-7 w-7 text-[#0057D9]" />
                <p className="mt-3 font-bold text-[#1A2235]">Support hours</p>
                <div className="mt-3 space-y-1.5 text-sm text-[#374151]">
                  <div className="flex justify-between"><span>Live chat &amp; phone</span><span className="font-semibold">24 / 7 / 365</span></div>
                  <div className="flex justify-between"><span>Email support</span><span className="font-semibold">24 / 7 (≤ 4 hr reply)</span></div>
                  <div className="flex justify-between"><span>WhatsApp</span><span className="font-semibold">9 AM – 11 PM IST</span></div>
                </div>
              </div>

              {offices.map((o) => (
                <div key={o.city} className="card-lift flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF]">
                    <MapPin className="h-5 w-5 text-[#0057D9]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2235]">{o.city}</p>
                    <p className="mt-0.5 text-sm text-[#6B7280]">{o.address}</p>
                  </div>
                </div>
              ))}

              <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] p-6">
                <p className="font-bold text-[#1A2235]">Department contacts</p>
                <div className="mt-3 space-y-1.5 text-sm text-[#374151]">
                  {[
                    { dept: "General support", email: "support@huts4u.com" },
                    { dept: "Media / press",   email: "press@huts4u.com"   },
                    { dept: "Partnerships",    email: "partners@huts4u.com" },
                    { dept: "Careers",         email: "careers@huts4u.com" },
                  ].map(({ dept, email }) => (
                    <div key={dept} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                      <span className="text-[#6B7280]">{dept}</span>
                      <a href={`mailto:${email}`} className="font-semibold text-[#0057D9] hover:underline">{email}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-16">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <h2 className="section-title relative text-white">Looking for instant answers?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Check our help centre — most common questions are answered there in seconds.</p>
          <Link href="/support" className="btn-primary mt-8 inline-flex items-center gap-2">
            Visit Help Centre <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
