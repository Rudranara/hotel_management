"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          <Link href="/" className="flex items-center gap-3">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold lg:h-11 lg:w-11 ${isHome ? "bg-white/15 text-white backdrop-blur-md" : "bg-[#22C7C7] text-white"}`}>
              H4
            </span>
            <span className={`text-base font-semibold lg:text-lg ${isHome ? "text-white" : "text-[#111827]"}`}>Huts4u</span>
          </Link>

          <div className="flex items-center gap-2.5 lg:gap-3">
            <Link
              href="/register"
              className={`rounded-full px-5 py-2 text-sm font-medium transition md:px-6 md:py-2.5 ${
                isHome
                  ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  : "border border-[#E5E7EB] bg-white text-[#374151] hover:shadow-sm"
              }`}
            >
              Register
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-[#111827] px-5 py-2 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:shadow-md md:px-6 md:py-2.5"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
