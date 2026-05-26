export default function AdminLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="h-1.5 w-full animate-pulse bg-[#E5E7EB]" />
        <div className="space-y-3 px-8 py-7">
          <div className="h-3 w-24 animate-pulse rounded bg-[#F1F5F9]" />
          <div className="h-9 w-72 animate-pulse rounded-lg bg-[#F1F5F9]" />
          <div className="h-4 w-96 animate-pulse rounded bg-[#F1F5F9]" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="h-12 w-12 animate-pulse rounded-xl bg-[#F1F5F9]" />
            <div className="space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-[#F1F5F9]" />
              <div className="h-7 w-12 animate-pulse rounded bg-[#F1F5F9]" />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics chart + check-ins */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="mb-5 flex justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-[#F1F5F9]" />
              <div className="h-6 w-32 animate-pulse rounded bg-[#F1F5F9]" />
            </div>
            <div className="h-10 w-20 animate-pulse rounded bg-[#F1F5F9]" />
          </div>
          <div className="flex h-32 items-end gap-1">
            {[45, 70, 30, 85, 60, 40, 75, 55, 90, 35, 65, 80, 50, 70].map((h, i) => (
              <div key={i} className="flex-1 animate-pulse rounded-t bg-[#F1F5F9]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="h-3 w-32 animate-pulse rounded bg-[#F1F5F9]" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-[#F1F5F9]" />
          ))}
        </div>
      </div>

      {/* Manager sections */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="space-y-2 border-b border-[#E5E7EB] px-6 py-5">
            <div className="h-3 w-20 animate-pulse rounded bg-[#F1F5F9]" />
            <div className="h-6 w-40 animate-pulse rounded bg-[#F1F5F9]" />
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="flex items-center gap-5 px-6 py-5">
                <div className="h-12 w-16 animate-pulse rounded-xl bg-[#F1F5F9]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-[#F1F5F9]" />
                  <div className="h-3 w-28 animate-pulse rounded bg-[#F1F5F9]" />
                </div>
                <div className="h-9 w-24 animate-pulse rounded-full bg-[#F1F5F9]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
