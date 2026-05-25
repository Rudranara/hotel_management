"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dashboard", label: "Dashboard" },
];

export function HomeNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`z-50 w-full ${
        isHome
          ? "absolute inset-x-0 top-0"
          : "sticky top-0 border-b border-[#E5E7EB] bg-white/95 shadow-[0_1px_10px_rgba(15,23,42,0.03)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between py-5 lg:py-6">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold lg:h-11 lg:w-11 ${isHome ? "bg-white/15 text-white backdrop-blur-md" : "bg-[#22C7C7] text-white"}`}>
              H4
            </span>
            <span className={`text-base font-semibold lg:text-lg ${isHome ? "text-white" : "text-[#111827]"}`}>Huts4u</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${isHome ? "text-white/75 hover:text-white" : "text-[#6B7280] hover:text-[#111827]"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 lg:gap-3">
            {/* Desktop auth buttons */}
            <Link
              href="/register"
              className={`hidden rounded-full px-5 py-2 text-sm font-medium transition md:inline-flex md:px-6 md:py-2.5 ${
                isHome
                  ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  : "border border-[#E5E7EB] bg-white text-[#374151] hover:shadow-sm"
              }`}
            >
              Register
            </Link>
            <Link
              href="/login"
              className="hidden rounded-full bg-[#111827] px-5 py-2 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:shadow-md md:inline-flex md:px-6 md:py-2.5"
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
        <div className={`border-t md:hidden ${isHome ? "border-white/10 bg-slate-900/95 backdrop-blur-xl" : "border-[#E5E7EB] bg-white"}`}>
          <nav className="mx-auto max-w-[1400px] space-y-1 px-4 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${isHome ? "text-white/80 hover:bg-white/10" : "text-[#374151] hover:bg-[#F1F5F9]"}`}
              >
                {item.label}
              </Link>
            ))}
            <div className={`mt-3 border-t pt-3 ${isHome ? "border-white/10" : "border-[#E5E7EB]"}`}>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${isHome ? "text-white/80 hover:bg-white/10" : "text-[#374151] hover:bg-[#F1F5F9]"}`}
              >
                Register
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-1 block rounded-xl bg-[#22C7C7] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
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
