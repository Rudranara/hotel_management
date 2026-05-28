import Image from "next/image";
import type { Metadata } from "next";
import { ResetPasswordForm } from "./_form";

export const metadata: Metadata = {
  title: "Reset Password | Huts4u",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
      <Image
        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=2400&q=80"
        alt="Luxury hotel lobby"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.88)_0%,rgba(15,23,42,0.75)_100%)]" />
      <div className="relative z-10 w-full max-w-md">
        <ResetPasswordForm token={token ?? ""} />
      </div>
    </section>
  );
}
