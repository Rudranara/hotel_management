"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button — injected into navbar space */}
      <div className="sticky top-0 z-30 -mt-px border-b border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur-xl sm:px-6 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#374151] transition hover:bg-[#F1F5F9]"
          aria-label="Open navigation"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
              <span className="font-semibold text-[#111827]">Navigation</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F1F5F9]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4" onClick={() => setSidebarOpen(false)}>
              <Sidebar />
            </div>
          </aside>
        </div>
      )}

      {/* Desktop + mobile main grid */}
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8 lg:py-12">
        {/* Desktop sidebar (hidden on mobile) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div>{children}</div>
      </section>
    </>
  );
}
