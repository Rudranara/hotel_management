import Link from "next/link";
import { Globe2, MessageCircleMore, SendHorizontal, Plane, Hotel, Package, Car, Train, Bus, Smartphone, MapPin } from "lucide-react";

const services = [
  { href: "/flights",   label: "Flights",          icon: Plane   },
  { href: "/rooms",     label: "Hotels",           icon: Hotel   },
  { href: "/packages",  label: "Holiday Packages", icon: Package },
  { href: "/cabs",      label: "Cabs",             icon: Car     },
  { href: "/trains",    label: "Trains",           icon: Train   },
  { href: "/bus",       label: "Bus",              icon: Bus     },
];

const company = [
  { href: "/about",    label: "About Us"       },
  { href: "/careers",  label: "Careers"        },
  { href: "/blog",     label: "Blog & Travel Tips" },
  { href: "/press",    label: "Press"          },
  { href: "/partners", label: "Partner with Us" },
];

const support = [
  { href: "/support",       label: "Help Center"       },
  { href: "/cancellations", label: "Cancellation Policy" },
  { href: "/refunds",       label: "Refund Policy"     },
  { href: "/safety",        label: "Travel Safety"     },
  { href: "/contact",       label: "Contact Us"        },
];

const legal = [
  { href: "/privacy",  label: "Privacy Policy"   },
  { href: "/terms",    label: "Terms & Conditions" },
  { href: "/cookies",  label: "Cookie Policy"    },
  { href: "/sitemap",  label: "Sitemap"          },
];

const destinations = ["Goa", "Manali", "Kerala", "Rajasthan", "Andaman", "Rishikesh", "Coorg", "Spiti"];

export function HomeFooter() {
  return (
    <footer id="contact" className="bg-[#0A1628] text-white">
      {/* App download banner */}
      <div className="border-b border-white/8 bg-[#0D1F3C]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-10 xl:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0057D9]">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">Download the Huts4u App</p>
              <p className="text-sm text-white/55">Exclusive app-only deals + offline booking support</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15">
              <span className="text-base">🍎</span> App Store
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15">
              <span className="text-base">🤖</span> Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-12">
        {/* Main footer grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0057D9] text-sm font-bold text-white">H4</span>
              <div>
                <p className="font-bold text-white lg:text-lg">Huts4u</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Travel & Stays</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
              India&apos;s intelligent travel platform. Book flights, hotels, packages & more — powered by AI for smarter, cheaper, better travel.
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-xs text-white/45">
              <MapPin className="h-3.5 w-3.5" />Serving 500+ destinations across India & beyond
            </div>
            {/* Social */}
            <div className="mt-5 flex gap-2">
              {[Globe2, MessageCircleMore, SendHorizontal].map((Icon, i) => (
                <button key={i} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/12 hover:text-white">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/45">Newsletter</p>
              <div className="flex h-11 rounded-xl border border-white/10 bg-white/5 p-1">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/30 focus:outline-none" />
                <button className="rounded-lg bg-[#FF6B35] px-3 text-xs font-bold text-white transition hover:bg-[#E85520]">Join</button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Services</p>
            <div className="space-y-3">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} href={item.href} className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                    <Icon className="h-3.5 w-3.5 text-white/30" />{item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Company</p>
            <div className="space-y-3">
              {company.map((item) => (
                <Link key={item.label} href={item.href} className="block text-sm text-white/60 transition hover:text-white">{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Support</p>
            <div className="space-y-3">
              {support.map((item) => (
                <Link key={item.label} href={item.href} className="block text-sm text-white/60 transition hover:text-white">{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Legal</p>
            <div className="space-y-3">
              {legal.map((item) => (
                <Link key={item.label} href={item.href} className="block text-sm text-white/60 transition hover:text-white">{item.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Popular destinations */}
        <div className="mt-12 border-t border-white/8 pt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Popular Destinations</p>
          <div className="flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <Link key={dest} href={`/rooms?destination=${dest.toLowerCase()}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55 transition hover:border-white/20 hover:bg-white/10 hover:text-white">
                {dest}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust badges + payment methods */}
        <div className="mt-10 border-t border-white/8 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { emoji: "🔒", label: "SSL Secured" },
                { emoji: "✅", label: "Verified Platform" },
                { emoji: "🏆", label: "Award Winning" },
                { emoji: "🇮🇳", label: "Made in India" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
                >
                  <span>{badge.emoji}</span>
                  {badge.label}
                </div>
              ))}
            </div>
            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs text-white/35">We accept:</span>
              {["Visa", "Mastercard", "UPI", "Razorpay", "Net Banking"].map((method) => (
                <span
                  key={method}
                  className="rounded border border-white/10 bg-white/8 px-2 py-0.5 text-[11px] font-semibold text-white/55"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/8 pt-6 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">© 2026 Huts4u Travel Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="mt-2 text-xs text-white/35 sm:mt-0">Made in India 🇮🇳 · Trusted by 2M+ travelers</p>
        </div>
      </div>
    </footer>
  );
}

