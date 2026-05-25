import { BookingsSkeleton } from "@/components/skeletons";

export default function BookingsLoading() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="animate-pulse rounded h-8 w-40 bg-[#E5E7EB]" />
      </div>
      <BookingsSkeleton />
    </div>
  );
}
