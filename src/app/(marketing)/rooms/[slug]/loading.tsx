export default function RoomDetailLoading() {
  return (
    <div className="bg-white">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] min-h-[440px] animate-pulse bg-[#E5E7EB]" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <div className="space-y-8">
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 h-72 animate-pulse rounded-2xl bg-[#E5E7EB]" />
              <div className="grid grid-rows-2 gap-2">
                <div className="h-[138px] animate-pulse rounded-xl bg-[#E5E7EB]" />
                <div className="h-[138px] animate-pulse rounded-xl bg-[#E5E7EB]" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
              <div className="h-3 w-28 animate-pulse rounded bg-[#E5E7EB]" />
              <div className="space-y-2">
                {[100, 95, 85, 75].map((w) => (
                  <div key={w} className="h-4 animate-pulse rounded bg-[#F1F5F9]" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
              <div className="mb-5 h-3 w-28 animate-pulse rounded bg-[#E5E7EB]" />
              <div className="flex flex-wrap gap-2.5">
                {[80, 100, 90, 110, 70, 95].map((w, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-full bg-[#F1F5F9]" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-fit space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <div className="h-3 w-28 animate-pulse rounded bg-[#E5E7EB]" />
            <div className="h-14 w-40 animate-pulse rounded bg-[#E5E7EB]" />
            <div className="space-y-3 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 animate-pulse rounded bg-[#E5E7EB]" />
                  <div className="h-4 w-24 animate-pulse rounded bg-[#E5E7EB]" />
                </div>
              ))}
            </div>
            <div className="h-14 animate-pulse rounded-full bg-[#E5E7EB]" />
          </div>
        </div>
      </div>
    </div>
  );
}

