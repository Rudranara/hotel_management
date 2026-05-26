export default function BookingPageLoading() {
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero */}
      <div className="relative h-64 w-full animate-pulse bg-white/5 md:h-80" />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        {/* Room summary */}
        <div className="space-y-5">
          {/* Price */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-12 w-40 animate-pulse rounded bg-white/8" />
          </div>
          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
          {/* Amenities */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="flex flex-wrap gap-2">
              {[70, 90, 80, 110, 75].map((w, i) => (
                <div key={i} className="h-7 animate-pulse rounded-full bg-white/5" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
          {/* Description lines */}
          <div className="space-y-2">
            {[100, 95, 85, 70].map((w) => (
              <div key={w} className="h-4 animate-pulse rounded bg-white/5" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        {/* Form skeleton */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 space-y-5">
          <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          <div className="h-6 w-48 animate-pulse rounded bg-white/8" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-14 animate-pulse rounded-2xl bg-white/8" />
            <div className="h-14 animate-pulse rounded-2xl bg-white/8" />
          </div>
          <div className="h-14 animate-pulse rounded-2xl bg-white/8" />
          <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
          <div className="h-14 animate-pulse rounded-full bg-white/10" />
        </div>
      </section>
    </div>
  );
}
