"use client";

import { useDeferredValue, useState } from "react";

export function useRoomFilters<T extends { name: string; type: string; location: string; price: number }>(
  rooms: T[],
) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60000);
  const deferredQuery = useDeferredValue(query);

  const filteredRooms = rooms.filter((room) => {
    const matchesQuery =
      !deferredQuery ||
      `${room.name} ${room.location}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesType = type === "All" || room.type === type;
    const matchesPrice = room.price <= maxPrice;

    return matchesQuery && matchesType && matchesPrice;
  });

  return {
    query,
    setQuery,
    type,
    setType,
    maxPrice,
    setMaxPrice,
    filteredRooms,
  };
}
