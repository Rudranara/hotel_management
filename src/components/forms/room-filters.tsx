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
  const { query, setQuery, type, setType, maxPrice, setMaxPrice, filteredRooms } = useRoomFilters(rooms);

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-white/50">
          <SlidersHorizontal size={15} />
          <span className="text-xs uppercase tracking-[0.3em]">Filter rooms</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or location…"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-200/60 focus:bg-white/8"
          />

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-amber-200/60"
          >
            <option value="All">All room types</option>
            {ROOM_TYPES.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-white/50">Max price</span>
              <span className="text-sm font-medium text-amber-200">₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={60000}
              step={1000}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full accent-amber-300"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          <span className="font-semibold text-white">{filteredRooms.length}</span>{" "}
          {filteredRooms.length === 1 ? "room" : "rooms"} found
        </p>
        {(query || type !== "All" || maxPrice < 60000) && (
          <button
            onClick={() => {
              setQuery("");
              setType("All");
              setMaxPrice(60000);
            }}
            className="text-xs text-amber-200/70 transition hover:text-amber-200"
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
