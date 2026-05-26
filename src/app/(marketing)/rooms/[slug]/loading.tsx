export default function RoomDetailLoading() {
  return (
    <div className="bg-[#020617]">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] min-h-[440px] animate-pulse bg-white/5" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <div className="space-y-8">
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 h-72 animate-pulse rounded-[2rem] bg-white/8" />
              <div className="grid grid-rows-2 gap-2">
                <div className="h-[138px] animate-pulse rounded-2xl bg-white/5" />
                <div className="h-[138px] animate-pulse rounded-2xl bg-white/5" />
              </div>
            </div>

            {/* Description */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 space-y-3">
              <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
              <div className="space-y-2">
                {[100, 95, 85, 75].map((w) => (
                  <div key={w} className={`h-4 animate-pulse rounded bg-white/8`} style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="mb-5 h-3 w-28 animate-pulse rounded bg-white/10" />
              <div className="flex flex-wrap gap-2.5">
                {[80, 100, 90, 110, 70, 95].map((w, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-full bg-white/5" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 space-y-5 h-fit">
            <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
            <div className="h-14 w-40 animate-pulse rounded bg-white/8" />
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/8" />
                </div>
              ))}
            </div>
            <div className="h-14 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
