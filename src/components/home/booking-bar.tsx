import { CalendarDays, MapPin, Search, Users } from "lucide-react";

export function BookingBar() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-[0_8px_40px_rgba(17,24,39,0.14)] sm:rounded-full sm:p-4 md:px-6 md:py-5 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        {/* Destination */}
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 md:px-6 lg:gap-4 lg:px-8">
          <MapPin className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Destination</p>
            <p className="mt-0.5 truncate text-sm text-[#111827] md:text-base">Choose location</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] sm:block md:h-12 lg:h-14" />

        {/* Check In */}
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 md:px-6 lg:gap-4 lg:px-7">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Check In</p>
            <p className="mt-0.5 text-sm text-[#111827] md:text-base">Add date</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] sm:block md:h-12 lg:h-14" />

        {/* Check Out */}
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 md:px-6 lg:gap-4 lg:px-7">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Check Out</p>
            <p className="mt-0.5 text-sm text-[#111827] md:text-base">Add date</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] sm:block md:h-12 lg:h-14" />

        {/* Rooms & Guests */}
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-0 md:px-6 lg:gap-4 lg:px-7">
          <Users className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Rooms &amp; Guests</p>
            <p className="mt-0.5 text-sm text-[#111827] md:text-base">1 Room, 2 Guests</p>
          </div>
        </div>

        {/* Search button — own container so it sits flush with the pill edge */}
        <div className="hidden sm:flex sm:shrink-0 sm:items-center sm:pl-3 lg:pl-4">
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-white transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_8px_20px_rgba(17,24,39,0.22)] lg:h-14 lg:w-14">
            <Search className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>

        {/* Mobile-only full-width search button */}
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111827] text-sm font-medium text-white transition hover:shadow-[0_8px_20px_rgba(17,24,39,0.22)] sm:hidden">
          <Search className="h-4 w-4" />
          Search Hotels
        </button>
      </div>
    </div>
  );
}
