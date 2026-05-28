import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { connectToDatabase } from "@/lib/mongodb";
import { isDatabaseConfigured } from "@/lib/env";
import Booking from "@/models/Booking";
import { BarChart2, BedDouble, BookOpen, Users } from "lucide-react";

const MOBILE_TABS = [
  { href: "#analytics", label: "Analytics", icon: BarChart2 },
  { href: "#rooms",     label: "Rooms",     icon: BedDouble  },
  { href: "#bookings",  label: "Bookings",  icon: BookOpen   },
  { href: "#users",     label: "Users",     icon: Users      },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let pendingCount = 0;
  if (isDatabaseConfigured()) {
    try {
      await connectToDatabase();
      pendingCount = await Booking.countDocuments({ status: "pending" });
    } catch {
      // non-fatal
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navbar />

      {/* ── Mobile section tabs (hidden on desktop) ── */}
      <div className="sticky top-0 z-30 -mt-px border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl lg:hidden">
        <div className="flex overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MOBILE_TABS.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-[#6B7280] transition hover:bg-[#F1F5F9] hover:text-[#111827]"
            >
              <Icon className="h-4 w-4 text-[#22C7C7]" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-12">
        <div className="hidden lg:block">
          <AdminSidebar pendingCount={pendingCount} />
        </div>
        <div className="min-w-0">{children}</div>
      </section>
      <Footer />
    </div>
  );
}
