import { HomeNavbar } from "@/components/home/navbar";
import { HomeFooter } from "@/components/home/footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <HomeNavbar />
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
}
