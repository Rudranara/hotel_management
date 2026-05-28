"use client";

import { useDeferredValue, useEffect, useState } from "react";

export function useRoomFilters<T extends { _id: unknown; name: string; type: string; location: string; price: number; capacity?: number }>(
  rooms: T[],
  initialType = "All",
) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(initialType);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [minCapacity, setMinCapacity] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [unavailableIds, setUnavailableIds] = useState<Set<string>>(new Set());
  const deferredQuery = useDeferredValue(query);

  // Fetch unavailable rooms when dates change
  useEffect(() => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setUnavailableIds(new Set());
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const params = new URLSearchParams({ checkIn, checkOut });
        const res = await fetch(`/api/rooms?${params.toString()}`);
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { data?: T[] };
        const availableSet = new Set((data.data ?? []).map((r) => String(r._id)));
        if (!cancelled) {
          // Mark any room NOT in available set as unavailable
          const allIds = rooms.map((r) => String(r._id));
          setUnavailableIds(new Set(allIds.filter((id) => !availableSet.has(id))));
        }
      } catch {
        // silently ignore
      }
    })();
    return () => { cancelled = true; };
  }, [checkIn, checkOut, rooms]);

  const filteredRooms = rooms.filter((room) => {
    const matchesQuery =
      !deferredQuery ||
      `${room.name} ${room.location}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesType = type === "All" || room.type === type;
    const matchesPrice = room.price <= maxPrice;
    const matchesCapacity = minCapacity <= 1 || (room.capacity ?? 1) >= minCapacity;
    const isAvailable = !unavailableIds.has(String(room._id));

    return matchesQuery && matchesType && matchesPrice && matchesCapacity && isAvailable;
  });

  return {
    query,
    setQuery,
    type,
    setType,
    maxPrice,
    setMaxPrice,
    minCapacity,
    setMinCapacity,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    filteredRooms,
  };
}
