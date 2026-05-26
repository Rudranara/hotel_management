export default function RoomsLoading() {
  return (
    <div className="bg-[#020617]">
      {/* Hero skeleton */}
      <div className="h-80 animate-pulse bg-white/5 sm:h-96 md:h-[28rem]" />

      {/* Trust strip skeleton */}
      <div className="border-y border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-5">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-white/5" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 animate-pulse rounded bg-white/8" />
                <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 space-y-8">
        {/* Filter bar */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <div className="mb-4 h-3 w-24 animate-pulse rounded bg-white/10" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-2xl bg-white/8" />
            ))}
          </div>
          <div className="mt-4 h-12 animate-pulse rounded-2xl bg-white/5" />
        </div>

        {/* Room cards grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="h-60 animate-pulse bg-white/8" />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
                    <div className="h-4 w-28 animate-pulse rounded bg-white/5" />
                  </div>
                  <div className="h-7 w-14 animate-pulse rounded-full bg-white/5" />
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
                  ))}
                </div>
                <div className="flex items-end justify-between border-t border-white/8 pt-4">
                  <div className="space-y-1">
                    <div className="h-3 w-14 animate-pulse rounded bg-white/5" />
                    <div className="h-7 w-24 animate-pulse rounded bg-white/10" />
                  </div>
                  <div className="h-10 w-28 animate-pulse rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
