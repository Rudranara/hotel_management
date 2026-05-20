import Link from "next/link";
import { Globe2, MessageCircleMore, SendHorizontal } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/#offers", label: "Offers" },
  { href: "/#about", label: "About Us" },
];

const helpLinks = [
  { href: "/", label: "Help Center" },
  { href: "/", label: "Cancellation Options" },
  { href: "/", label: "Privacy Policy" },
  { href: "/", label: "Terms & Conditions" },
];

export function HomeFooter() {
  return (
    <footer id="contact" className="mt-6 rounded-t-[1.75rem] bg-[#0F172A] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 md:px-8 lg:px-10 lg:py-14 xl:px-12 xl:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-12 xl:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#3CCFCF] text-sm font-semibold text-white lg:h-12 lg:w-12">
                H4
              </span>
              <p className="text-base font-semibold lg:text-lg xl:text-xl">Huts4u</p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60 lg:text-base">
              A premium travel and hotel booking destination designed for beautiful stays, seamless planning, and refined hospitality.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10 lg:px-5 lg:py-3.5 lg:text-base">App Store</button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10 lg:px-5 lg:py-3.5 lg:text-base">Google Play</button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45 sm:text-sm">Quick Links</p>
            <div className="mt-4 flex flex-col gap-3 lg:gap-4">
              {quickLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm text-white/65 transition hover:text-white lg:text-base">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45 sm:text-sm">Help Center</p>
            <div className="mt-4 flex flex-col gap-3 lg:gap-4">
              {helpLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm text-white/65 transition hover:text-white lg:text-base">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45 sm:text-sm">Newsletter</p>
            <p className="mt-4 text-sm leading-6 text-white/60 lg:text-base lg:leading-7">
              Subscribe for destination inspiration, special offers, and curated hotel picks.
            </p>
            <div className="mt-4 flex h-14 rounded-full border border-white/10 bg-white/5 p-1.5">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35 lg:text-base"
              />
              <button className="rounded-full bg-[#3CCFCF] px-5 text-sm font-medium text-white transition hover:bg-[#22C7C7] lg:px-6 lg:text-base">Join</button>
            </div>
            <div className="mt-5 flex gap-2.5 text-white/65">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 lg:h-12 lg:w-12"><Globe2 className="h-4 w-4 lg:h-5 lg:w-5" /></span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 lg:h-12 lg:w-12"><MessageCircleMore className="h-4 w-4 lg:h-5 lg:w-5" /></span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 lg:h-12 lg:w-12"><SendHorizontal className="h-4 w-4 lg:h-5 lg:w-5" /></span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex sm:items-center sm:justify-between lg:mt-14 lg:text-base">
          <p>Copyright 2026 Huts4u. All rights reserved.</p>
          <p>Luxury hotel booking, thoughtfully designed.</p>
        </div>
      </div>
    </footer>
  );
}
