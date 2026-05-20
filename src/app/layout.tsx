import type { Metadata } from "next";

import "./globals.css";

import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "Huts4u | Hotel Management Website",
  description: "Modern full-stack hotel management website built with Next.js, MongoDB, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F8F6] font-sans text-[#111827]">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
