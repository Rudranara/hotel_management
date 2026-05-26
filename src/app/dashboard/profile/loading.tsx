export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Identity card skeleton */}
      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="h-1.5 w-full animate-pulse bg-[#E5E7EB]" />
        <div className="flex flex-col gap-5 p-8 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="h-20 w-20 shrink-0 animate-pulse rounded-2xl bg-[#F1F5F9]" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-7 w-48 animate-pulse rounded-lg bg-[#F1F5F9]" />
            <div className="h-4 w-32 animate-pulse rounded-lg bg-[#F1F5F9]" />
            <div className="flex flex-wrap gap-2 pt-1">
              {[80, 120, 100].map((w) => (
                <div
                  key={w}
                  className="h-7 animate-pulse rounded-full bg-[#F1F5F9]"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
          >
            <div className="h-3 w-16 animate-pulse rounded bg-[#F1F5F9]" />
            <div className="mt-3 h-7 w-12 animate-pulse rounded bg-[#F1F5F9]" />
          </div>
        ))}
      </div>

      {/* Edit form skeleton */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="mb-6 h-6 w-44 animate-pulse rounded-lg bg-[#F1F5F9]" />
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="mb-1.5 h-3 w-20 animate-pulse rounded bg-[#F1F5F9]" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-[#F1F5F9]" />
            </div>
          ))}
          <div className="h-11 w-32 animate-pulse rounded-full bg-[#F1F5F9]" />
        </div>
      </div>

      {/* Account details skeleton */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="mb-6 h-6 w-40 animate-pulse rounded-lg bg-[#F1F5F9]" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
              <div className="h-3 w-20 animate-pulse rounded bg-[#F1F5F9]" />
              <div className="mt-2 h-5 w-32 animate-pulse rounded bg-[#F1F5F9]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
