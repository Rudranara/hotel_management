export default function DealsLoading() {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      {/* Hero */}
      <div className="bg-[#020617] px-4 py-20 text-center sm:py-28">
        <div className="mx-auto h-3 w-28 animate-pulse rounded bg-white/10" />
        <div className="mx-auto mt-5 h-12 max-w-lg animate-pulse rounded-xl bg-white/5" />
        <div className="mx-auto mt-4 h-5 max-w-md animate-pulse rounded bg-white/5" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="h-64 w-full animate-pulse bg-[#E5E7EB] sm:h-72" />
              <div className="space-y-4 p-7">
                <div className="h-6 w-3/4 animate-pulse rounded bg-[#F1F5F9]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#F1F5F9]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[#F1F5F9]" />
                <div className="space-y-2 pt-2">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="h-4 w-2/3 animate-pulse rounded bg-[#F1F5F9]" />
                  ))}
                </div>
                <div className="flex justify-between border-t border-[#F3F4F6] pt-5">
                  <div className="h-4 w-28 animate-pulse rounded bg-[#F1F5F9]" />
                  <div className="h-4 w-20 animate-pulse rounded bg-[#F1F5F9]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
