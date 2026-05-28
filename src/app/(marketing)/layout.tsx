import { HomeNavbar } from "@/components/home/navbar";
import { HomeFooter } from "@/components/home/footer";
import { AIAssistant } from "@/components/ai/ai-assistant";

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
      <AIAssistant />
    </div>
  );
}

