import { cn } from "@/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[#E5E7EB]",
        className,
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-3 h-8 w-64" />
        <SkeletonText lines={2} className="mt-4 max-w-lg" />
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-10 w-16" />
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function BookingsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Tab bar skeleton */}
      <div className="flex gap-1 rounded-2xl border border-[#E5E7EB] bg-white p-1.5">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-9 flex-1 rounded-xl" />
        ))}
      </div>
      {/* Card skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex overflow-hidden rounded-2xl border border-[#E5E7EB] border-l-4 border-l-[#E5E7EB] bg-white shadow-sm">
          <Skeleton className="w-24 min-h-[110px] rounded-none sm:w-36" />
          <div className="flex flex-1 flex-col justify-between gap-3 p-5">
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-3 w-24" />
            </div>
            <div>
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="mt-2 h-3.5 w-1/3" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-48 rounded-lg" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoomCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
