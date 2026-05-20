import Link from "next/link";

export function EmptyState({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-lg backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.4em] text-amber-200">Huts4u</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-white/70">{description}</p>
      {href && cta ? (
        <Link
          href={href}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-100"
        >
          {cta}
        </Link>
      ) : null}
    </div>
  );
}
