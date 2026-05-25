import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navbar />
      <DashboardShell>{children}</DashboardShell>
      <Footer />
    </div>
  );
}
