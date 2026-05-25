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
      {/* Filter bar */}
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-white/50">
          <SlidersHorizontal size={15} />
          <span className="text-xs uppercase tracking-[0.3em]">Filter rooms</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          {/* Check-in */}
          <div>
            <label className="mb-1.5 block text-xs text-white/40">Check-in</label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#22C7C7]/60 [color-scheme:dark]"
            />
          </div>
          {/* Check-out */}
          <div>
            <label className="mb-1.5 block text-xs text-white/40">Check-out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#22C7C7]/60 [color-scheme:dark]"
            />
          </div>
          {/* Search */}
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or location…"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#22C7C7]/60 focus:bg-white/8"
          />
          {/* Type */}
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-[#22C7C7]/60"
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
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-white/50">Max price per night</span>
            <span className="text-sm font-medium text-[#22C7C7]">₹{maxPrice.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min={5000}
            max={60000}
            step={1000}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-[#22C7C7]"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          <span className="font-semibold text-white">{filteredRooms.length}</span>{" "}
          {filteredRooms.length === 1 ? "room" : "rooms"} found
          {checkIn && checkOut && (
            <span className="ml-2 rounded-full border border-[#22C7C7]/20 bg-[#22C7C7]/10 px-2 py-0.5 text-xs text-[#22C7C7]">
              available {checkIn} → {checkOut}
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
            className="text-xs text-[#22C7C7]/70 transition hover:text-[#22C7C7]"
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
