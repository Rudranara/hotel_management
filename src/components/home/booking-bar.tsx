"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

import { SmartSearchBar, type AIFilters } from "@/components/search/smart-search-bar";

const selectCls = "absolute inset-0 w-full cursor-pointer opacity-0";

export function BookingBar() {
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0]!;
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests]     = useState(2);

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn)  params.set("checkIn",  checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests > 1) params.set("guests", String(guests));
    router.push(`/rooms?${params.toString()}`);
  }

  function handleAiSearch(filters: AIFilters) {
    const params = new URLSearchParams();
    if (filters.destination) params.set("location",  filters.destination);
    if (filters.type)        params.set("type",      filters.type);
    if (filters.maxPrice)    params.set("maxPrice",  String(filters.maxPrice));
    if (filters.minGuests)   params.set("guests",    String(filters.minGuests));
    // Preserve manually set dates/guests when AI doesn't override them
    if (!filters.minGuests && guests > 1) params.set("guests", String(guests));
    if (checkIn)  params.set("checkIn",  checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-[0_8px_40px_rgba(17,24,39,0.14)] sm:rounded-full sm:p-4 md:px-6 md:py-5 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        {/* Destination */}
        <div className="relative flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 md:px-6 lg:gap-4 lg:px-8">
          <MapPin className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div className="min-w-0 flex-1 overflow-visible">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Destination</p>
            <SmartSearchBar
              value={location}
              onChange={setLocation}
              onAiSearch={handleAiSearch}
              placeholder="Search destinations…"
            />
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] sm:block md:h-12 lg:h-14" />

        {/* Check In */}
        <div className="relative flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 md:px-6 lg:gap-4 lg:px-7">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Check In</p>
            <p className={`mt-0.5 text-sm md:text-base ${checkIn ? "text-[#111827]" : "text-[#9CA3AF]"}`}>{checkIn || "Add date"}</p>
          </div>
          <input type="date" value={checkIn} min={today} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }} className={`${selectCls} [color-scheme:light]`} aria-label="Check-in date" />
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] sm:block md:h-12 lg:h-14" />

        {/* Check Out */}
        <div className="relative flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 md:px-6 lg:gap-4 lg:px-7">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Check Out</p>
            <p className={`mt-0.5 text-sm md:text-base ${checkOut ? "text-[#111827]" : "text-[#9CA3AF]"}`}>{checkOut || "Add date"}</p>
          </div>
          <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className={`${selectCls} [color-scheme:light]`} aria-label="Check-out date" />
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] sm:block md:h-12 lg:h-14" />

        {/* Guests */}
        <div className="relative flex flex-1 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-4 py-3.5 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-0 md:px-6 lg:gap-4 lg:px-7">
          <Users className="h-4 w-4 shrink-0 text-[#111827] md:h-5 md:w-5" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] sm:text-xs lg:text-sm">Guests</p>
            <p className="mt-0.5 text-sm text-[#111827] md:text-base">{guests} Guest{guests !== 1 ? "s" : ""}</p>
          </div>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={selectCls} aria-label="Number of guests">
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Guest{n !== 1 ? "s" : ""}</option>)}
          </select>
        </div>

        {/* Desktop search button */}
        <div className="hidden sm:flex sm:shrink-0 sm:items-center sm:pl-3 lg:pl-4">
          <button onClick={handleSearch} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-white transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_8px_20px_rgba(17,24,39,0.22)] lg:h-14 lg:w-14" aria-label="Search rooms">
            <Search className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>

        {/* Mobile search button */}
        <button onClick={handleSearch} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111827] text-sm font-medium text-white transition hover:shadow-[0_8px_20px_rgba(17,24,39,0.22)] sm:hidden">
          <Search className="h-4 w-4" />
          Search Hotels
        </button>
      </div>
    </div>
  );
}
