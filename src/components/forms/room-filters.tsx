"use client";

import { SlidersHorizontal } from "lucide-react";

import { ROOM_TYPES } from "@/lib/constants";
import { useRoomFilters } from "@/hooks/use-room-filters";

import { EmptyState } from "@/components/empty-state";
import { RoomCard } from "@/components/room-card";

interface RoomFiltersProps {
  rooms: Array<{
    _id: string;
    name: string;
    slug: string;
    type: string;
    location: string;
    price: number;
    images: string[];
    availabilityStatus: string;
    rating: number;
    amenities: string[];
  }>;
}

export function RoomFilters({ rooms }: RoomFiltersProps) {
  const {
    query, setQuery,
    type, setType,
    maxPrice, setMaxPrice,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    filteredRooms,
  } = useRoomFilters(rooms);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      {/* Filter card */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-[#64748B]">
          <SlidersHorizontal size={15} />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">Filter Rooms</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          {/* Check-in */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#64748B]">Check-in</label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-[#1A2235] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15 [color-scheme:light]"
            />
          </div>
          {/* Check-out */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#64748B]">Check-out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-[#1A2235] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15 [color-scheme:light]"
            />
          </div>
          {/* Search */}
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or location…"
            className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-[#1A2235] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15"
          />
          {/* Type */}
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-[#1A2235] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15"
          >
            <option value="All">All room types</option>
            {ROOM_TYPES.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>

        {/* Price range row */}
        <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Max price per night</span>
            <span className="text-sm font-semibold text-[#0057D9]">₹{maxPrice.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min={5000}
            max={60000}
            step={1000}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-[#0057D9]"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748B]">
          <span className="font-semibold text-[#1A2235]">{filteredRooms.length}</span>{" "}
          {filteredRooms.length === 1 ? "room" : "rooms"} found
          {checkIn && checkOut && (
            <span className="ml-2 rounded-full border border-[#DBEAFE] bg-[#EEF4FF] px-2.5 py-0.5 text-xs font-medium text-[#0057D9]">
              {checkIn} → {checkOut}
            </span>
          )}
        </p>
        {(query || type !== "All" || maxPrice < 60000 || checkIn || checkOut) && (
          <button
            onClick={() => {
              setQuery("");
              setType("All");
              setMaxPrice(60000);
              setCheckIn("");
              setCheckOut("");
            }}
            className="text-xs font-medium text-[#0057D9]/70 transition hover:text-[#0057D9]"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No rooms match your filters"
          description="Try changing the room type, price cap, or search term to discover more stays."
        />
      )}
    </div>
  );
}
