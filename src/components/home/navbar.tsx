"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu, X, Plane, Hotel, Package, Car, Train, Bus, FileText,
  Shield, Briefcase, HeadphonesIcon, ChevronDown, Bell, Sparkles,
} from "lucide-react";

const primaryNav = [
  { href: "/flights",   label: "Flights",            icon: Plane },
  { href: "/rooms",     label: "Hotels",             icon: Hotel },
  { href: "/packages",  label: "Holiday Packages",   icon: Package },
  { href: "/cabs",      label: "Cabs",               icon: Car },
  { href: "/trains",    label: "Trains",             icon: Train },
  { href: "/bus",       label: "Bus",                icon: Bus },
];

const moreNav = [
  { href: "/visa",        label: "Visa Services",    icon: FileText },
  { href: "/insurance",   label: "Travel Insurance", icon: Shield },
  { href: "/dashboard/bookings", label: "My Trips",  icon: Briefcase },
  { href: "/support",     label: "Support",          icon: HeadphonesIcon },
];

export function HomeNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = isHome
    ? scrolled
      ? "bg-[#0A1628]/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
      : "bg-transparent"
    : "sticky top-0 bg-white/98 border-b border-[#E5E7EB] shadow-[0_1px_12px_rgba(15,23,42,0.05)] backdrop-blur-xl";

  const textColor = isHome ? "text-white/85 hover:text-white" : "text-[#374151] hover:text-[#0057D9]";

  return (
    <header className={`z-50 w-full transition-all duration-300 ${isHome ? `fixed inset-x-0 top-0 ${headerBg}` : headerBg}`}>
      {/* Top promo strip */}
      {!scrolled && isHome && (
        <div className="bg-[#FF6B35] py-1.5 text-center text-xs font-medium text-white">
          <Sparkles className="mr-1.5 inline h-3 w-3" />
          Flat 20% OFF on your first booking · Use code <strong>TRAVEL20</strong>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Main header row */}
        <div className="flex items-center justify-between py-3.5 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold lg:h-10 lg:w-10 ${isHome ? "bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md" : "bg-[#0057D9] text-white"}`}>
              H4
            </span>
            <div className="flex flex-col leading-none">
              <span className={`text-base font-bold tracking-tight lg:text-lg ${isHome ? "text-white" : "text-[#1A2235]"}`}>Huts4u</span>
              <span className={`text-[9px] font-medium uppercase tracking-widest ${isHome ? "text-white/50" : "text-[#0057D9]"}`}>Travel & Stays</span>
            </div>
          </Link>

          {/* Desktop primary nav */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition lg:px-3.5
                    ${active
                      ? isHome ? "bg-white/15 text-white" : "bg-[#0057D9]/8 text-[#0057D9]"
                      : textColor
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen((p) => !p)}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition lg:px-3.5 ${textColor}`}
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                More
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[#E5E7EB] bg-white py-2 shadow-xl">
                  {moreNav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] transition hover:bg-[#F7F9FC] hover:text-[#0057D9]"
                      >
                        <Icon className="h-4 w-4 text-[#6B7280]" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Compact nav for md screens */}
          <nav className="hidden items-center gap-0.5 md:flex xl:hidden">
            {primaryNav.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wide transition ${textColor}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Notification (logged in) */}
            <button className={`hidden h-9 w-9 items-center justify-center rounded-full transition md:flex ${isHome ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-[#6B7280] hover:bg-[#F1F5F9] hover:text-[#374151]"}`} aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
            </button>

            <Link
              href="/register"
              className={`hidden rounded-full px-4 py-2 text-sm font-medium transition md:inline-flex lg:px-5 ${
                isHome
                  ? "border border-white/20 text-white/85 hover:bg-white/10 hover:text-white"
                  : "border border-[#E5E7EB] text-[#374151] hover:border-[#0057D9] hover:text-[#0057D9]"
              }`}
            >
              Register
            </Link>
            <Link
              href="/login"
              className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition md:inline-flex lg:px-5 ${
                isHome
                  ? "bg-[#FF6B35] text-white shadow-[0_4px_14px_rgba(255,107,53,0.4)] hover:bg-[#E85520]"
                  : "bg-[#0057D9] text-white shadow-[0_4px_14px_rgba(0,87,217,0.25)] hover:bg-[#003A8C]"
              }`}
            >
              Login
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition md:hidden ${isHome ? "text-white hover:bg-white/10" : "text-[#374151] hover:bg-[#F1F5F9]"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`border-t md:hidden ${isHome ? "border-white/10 bg-[#0A1628]/97 backdrop-blur-xl" : "border-[#E5E7EB] bg-white"}`}>
          <nav className="mx-auto max-w-[1400px] px-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              {[...primaryNav, ...moreNav].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-wide transition
                      ${isHome ? "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white" : "bg-[#F7F9FC] text-[#374151] hover:bg-[#EEF2FF] hover:text-[#0057D9]"}`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className={`mt-4 flex gap-2 border-t pt-4 ${isHome ? "border-white/10" : "border-[#E5E7EB]"}`}>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className={`flex-1 rounded-full py-2.5 text-center text-sm font-medium transition ${isHome ? "border border-white/20 text-white/85 hover:bg-white/10" : "border border-[#E5E7EB] text-[#374151]"}`}
              >
                Register
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-full bg-[#FF6B35] py-2.5 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
