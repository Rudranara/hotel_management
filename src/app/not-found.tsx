import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#22C7C7]">Error 404</p>
      <h1 className="mt-4 font-serif text-8xl font-semibold text-white sm:text-9xl">404</h1>
      <p className="mt-4 text-xl font-medium text-white/80">Page not found</p>
      <p className="mt-3 max-w-sm text-base text-white/45">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-[#22C7C7] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
        >
          Back to home
        </Link>
        <Link
          href="/rooms"
          className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white"
        >
          Browse rooms
        </Link>
      </div>

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
