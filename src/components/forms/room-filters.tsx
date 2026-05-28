"use client";

import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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
    capacity?: number;
  }>;
  savedRoomIds?: Set<string>;
  initialType?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialLocation?: string;
  initialGuests?: number;
}

export function RoomFilters({ rooms, savedRoomIds = new Set(), initialType, initialCheckIn, initialCheckOut, initialLocation, initialGuests }: RoomFiltersProps) {
  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);
  const {
    query, setQuery,
    type, setType,
    maxPrice, setMaxPrice,
    minCapacity, setMinCapacity,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    filteredRooms,
  } = useRoomFilters(rooms, initialType, initialCheckIn, initialCheckOut, initialLocation, initialGuests);

  // Reset to page 1 whenever filtered results change
  useEffect(() => {
    setPage(1);
  }, [filteredRooms.length, query, type, maxPrice, minCapacity, checkIn, checkOut]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      {/* Filter card */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-[#64748B]">
          <SlidersHorizontal size={15} />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">Filter Rooms</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
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
          {/* Capacity */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#64748B]">Guests</label>
            <select
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-[#1A2235] outline-none transition focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/15"
            >
              <option value={1}>Any guests</option>
              <option value={2}>2+ guests</option>
              <option value={3}>3+ guests</option>
              <option value={4}>4+ guests</option>
              <option value={5}>5+ guests</option>
              <option value={6}>6+ guests</option>
            </select>
          </div>
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
        {(query || type !== "All" || maxPrice < 60000 || minCapacity > 1 || checkIn || checkOut) && (
          <button
            onClick={() => {
              setQuery("");
              setType("All");
              setMaxPrice(60000);
              setMinCapacity(1);
              setCheckIn("");
              setCheckOut("");
              setPage(1);
            }}
            className="text-xs font-medium text-[#0057D9]/70 transition hover:text-[#0057D9]"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredRooms.length > 0 ? (
        <>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.slice(0, page * PAGE_SIZE).map((room) => (
              <RoomCard key={room._id} room={room} isSaved={savedRoomIds.has(room._id)} />
            ))}
          </div>

          {/* Load more / pagination */}
          {filteredRooms.length > PAGE_SIZE && (
            <div className="flex flex-col items-center gap-3 pt-2">
              <p className="text-sm text-[#9CA3AF]">
                Showing{" "}
                <span className="font-semibold text-[#1A2235]">
                  {Math.min(page * PAGE_SIZE, filteredRooms.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#1A2235]">{filteredRooms.length}</span> rooms
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#64748B] shadow-sm transition hover:border-[#0057D9] hover:text-[#0057D9]"
                  >
                    <ChevronLeft size={15} />
                    Previous
                  </button>
                )}
                {page * PAGE_SIZE < filteredRooms.length && (
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#64748B] shadow-sm transition hover:border-[#0057D9] hover:text-[#0057D9]"
                  >
                    Load more
                    <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No rooms match your filters"
          description="Try changing the room type, price cap, or search term to discover more stays."
        />
      )}
    </div>
  );
}
