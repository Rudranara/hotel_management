"use client";

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
      <div className="grid gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl lg:grid-cols-[2fr_1fr_1fr]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or location"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-amber-200"
        />

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-amber-200"
        >
          <option value="All">All room types</option>
          {ROOM_TYPES.map((roomType) => (
            <option key={roomType} value={roomType}>
              {roomType}
            </option>
          ))}
        </select>

        <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="mb-2 block text-sm text-white/60">Max price: Rs {maxPrice}</span>
          <input
            type="range"
            min={5000}
            max={60000}
            step={1000}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full"
          />
        </label>
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
