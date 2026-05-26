import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { connectToDatabase } from "@/lib/mongodb";
import { isDatabaseConfigured } from "@/lib/env";
import Booking from "@/models/Booking";

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
