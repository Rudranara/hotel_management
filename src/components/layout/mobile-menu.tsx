"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isLoggedIn: boolean;
  userName?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dashboard", label: "Dashboard" },
];

export function MobileMenu({ isLoggedIn, userName }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle mobile menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition hover:bg-white/10"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-slate-950/95 px-4 pb-5 pt-3 backdrop-blur-xl">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 border-t border-white/10 pt-3">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                {userName && (
                  <p className="px-4 py-1 text-xs text-white/40">{userName}</p>
                )}
                <form action="/api/logout" method="POST">
                  <button
                    type="submit"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl bg-white/5 px-4 py-3 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    Log out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
