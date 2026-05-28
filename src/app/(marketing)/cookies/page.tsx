import Link from "next/link";
import { Cookie, CheckCircle, ArrowRight, Info, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Huts4u",
  description: "Huts4u Cookie Policy — what cookies we use, why we use them, and how to manage your preferences.",
};

const cookieTypes = [
  {
    name: "Strictly necessary",
    required: true,
    desc: "These cookies are essential for the platform to function. They keep you logged in, remember your basket, and enable secure payments. They cannot be disabled.",
    examples: ["Session authentication token", "CSRF protection token", "Booking cart state", "Payment session ID"],
  },
  {
    name: "Performance & analytics",
    required: false,
    desc: "These cookies help us understand how visitors interact with our platform — which pages are visited most, where errors occur, and how we can improve. All data is anonymous.",
    examples: ["Google Analytics (_ga, _gid)", "Hotjar heatmap session", "Page load timing metrics", "Error tracking (Sentry)"],
  },
  {
    name: "Functional",
    required: false,
    desc: "These cookies remember your preferences to give you a personalised experience — your preferred currency, language, recent searches, and filter settings.",
    examples: ["Preferred currency", "Language setting", "Recent search history", "Map zoom level"],
  },
  {
    name: "Marketing & targeting",
    required: false,
    desc: "With your consent, these cookies are used to show you relevant advertisements on third-party sites and to measure ad campaign effectiveness. We never share identifiable data for ad purposes.",
    examples: ["Meta Pixel", "Google Ads conversion", "Retargeting audience ID", "Campaign attribution"],
  },
];

const faq = [
  {
    q: "What is a cookie?",
    a: "A cookie is a small text file stored on your device by a website. It allows the site to remember information about your visit — like your login state or preferences — so you don't have to re-enter them every time.",
  },
  {
    q: "Can I use Huts4u without cookies?",
    a: "Strictly necessary cookies cannot be disabled — they are required for core functions like logging in and completing a booking. You can disable all other cookie categories without affecting basic functionality.",
  },
  {
    q: "How do I change my cookie preferences?",
    a: "Click the \"Cookie preferences\" link in the website footer at any time to update your consent settings. Changes take effect immediately.",
  },
  {
    q: "Do you use third-party cookies?",
    a: "Yes — for analytics (Google Analytics), heatmaps (Hotjar), and optional marketing (Meta, Google Ads). These third parties have their own privacy policies. We list all active third-party cookies in the table above.",
  },
  {
    q: "How long do cookies last?",
    a: "Session cookies are deleted when you close your browser. Persistent cookies have an expiry date — typically 30 days for analytics and up to 12 months for preference cookies. Marketing cookies follow the third party's retention period.",
  },
];

export default function CookiesPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0A1628] py-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 text-center sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0057D9]/20 to-transparent" />
          <span className="section-label !text-[#FF6B35]">Legal</span>
          <h1 className="section-title relative mt-3 text-white md:text-5xl">Cookie Policy</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            What cookies we use, why we need them, and how you can manage your preferences.
          </p>
          <p className="mt-3 text-sm text-white/40">Last updated: May 1, 2026</p>
        </div>
      </section>

      {/* ── Intro card ── */}
      <section className="bg-[#F7F9FC] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-start gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EEF4FF] p-6">
            <Info className="mt-0.5 h-6 w-6 shrink-0 text-[#0057D9]" />
            <p className="text-sm text-[#1E3A8A]">
              <span className="font-semibold">Quick summary:</span> We use essential cookies to run the site, analytics cookies to improve it, and (with your consent) marketing cookies to show relevant ads. You can manage all non-essential cookies at any time via the footer link.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cookie types ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <span className="section-label">Cookie categories</span>
          <h2 className="section-title mt-3">Cookies we use</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {cookieTypes.map(({ name, required, desc, examples }) => (
              <div key={name} className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF]">
                    <Cookie className="h-5 w-5 text-[#0057D9]" />
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${required ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {required ? "Required" : "Optional"}
                  </span>
                </div>
                <p className="mt-4 font-bold text-[#1A2235]">{name}</p>
                <p className="mt-2 text-sm text-[#6B7280]">{desc}</p>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Examples</p>
                  <ul className="space-y-1">
                    {examples.map((e) => (
                      <li key={e} className="flex items-center gap-2 text-sm text-[#374151]">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#0057D9]" /> {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Managing cookies ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="section-label">Your control</span>
              <h2 className="section-title mt-3">Managing your cookies</h2>
              <p className="mt-4 text-sm text-[#6B7280]">
                You have full control over non-essential cookies. Here are three ways to manage them:
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { step: "1", title: "Cookie preference centre", desc: "Use the \"Cookie preferences\" link in our footer to toggle each cookie category on or off at any time." },
                  { step: "2", title: "Browser settings",          desc: "Most browsers let you block or delete cookies via Settings → Privacy. Note: blocking essential cookies will break login and checkout." },
                  { step: "3", title: "Third-party opt-outs",      desc: "Opt out of Google Analytics at tools.google.com/dlpage/gaoptout. Opt out of Meta tracking via your Facebook Ad Preferences." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0057D9] text-sm font-extrabold text-white">{step}</div>
                    <div>
                      <p className="font-bold text-[#1A2235]">{title}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-lift rounded-2xl border border-[#E5E7EB] bg-white p-7">
              <ShieldCheck className="h-10 w-10 text-[#0057D9]" />
              <h3 className="mt-4 text-xl font-bold text-[#1A2235]">We respect your choices</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                We will never use cookies to track you without consent, sell your data to advertisers, or re-enable cookies you have disabled. Your preferences are stored locally and honoured on every visit.
              </p>
              <p className="mt-4 text-sm text-[#6B7280]">
                For questions about specific cookies, email{" "}
                <a href="mailto:privacy@huts4u.com" className="font-semibold text-[#0057D9] hover:underline">privacy@huts4u.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="section-label">Common questions</span>
            <h2 className="section-title mt-3">Cookie FAQs</h2>
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
          <h2 className="section-title relative text-white">Questions about cookies or privacy?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">Our Data Protection Officer is happy to help — email us or check the full Privacy Policy.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:privacy@huts4u.com" className="btn-primary inline-flex items-center gap-2">
              privacy@huts4u.com <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/privacy" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
