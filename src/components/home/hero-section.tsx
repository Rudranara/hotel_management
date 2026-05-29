"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plane, Hotel, Package, Car, Train, Bus,
  MapPin, CalendarDays, Users, Search, Sparkles,
} from "lucide-react";

import { SmartSearchBar, type AIFilters } from "@/components/search/smart-search-bar";

const tabs = [
  { id: "hotels",   label: "Hotels",           icon: Hotel   },
  { id: "flights",  label: "Flights",          icon: Plane   },
  { id: "packages", label: "Holiday Packages", icon: Package },
  { id: "cabs",     label: "Cabs",             icon: Car     },
  { id: "trains",   label: "Trains",           icon: Train   },
  { id: "bus",      label: "Bus",              icon: Bus     },
];

export function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hotels");
  const [destination, setDestination] = useState("");
  const today = new Date().toISOString().split("T")[0]!;
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests,   setGuests]   = useState(2);
  const [destError,     setDestError]     = useState(false);
  const [checkOutError, setCheckOutError] = useState("");
  const checkOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch() {
    if (!destination.trim()) {
      setDestError(true);
      setTimeout(() => setDestError(false), 600);
      return;
    }
    const params = new URLSearchParams();
    params.set("location", destination.trim());
    if (checkIn)    params.set("checkIn",  checkIn);
    if (checkOut)   params.set("checkOut", checkOut);
    if (guests > 1) params.set("guests",   String(guests));
    router.push(`/rooms?${params.toString()}`);
  }

  function handleAiSearch(filters: AIFilters) {
    const params = new URLSearchParams();
    if (filters.destination) params.set("location",  filters.destination);
    if (filters.type)        params.set("type",      filters.type);
    if (filters.maxPrice)    params.set("maxPrice",  String(filters.maxPrice));
    if (filters.minGuests)   params.set("guests",    String(filters.minGuests));
    if (!filters.minGuests && guests > 1) params.set("guests", String(guests));
    if (checkIn)  params.set("checkIn",  checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <section className="relative min-h-[90vh]">
      {/* Background — overflow-hidden here so orbs/image stay clipped without affecting the dropdown */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=80"
          alt="Premium travel destinations"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/50 to-[#0A1628]/80" />
        {/* Animated gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0057D9]/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-[#FF6B35]/15 blur-3xl" />
      </div>

      <div className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        {/* AI badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#FF6B35]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/90">AI-Powered Travel Planning</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-center text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
          Your Dream Trip,{" "}
          <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB347] bg-clip-text text-transparent">
            Planned by AI
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-center text-base leading-relaxed text-white/70 sm:text-lg">
          Flights, Hotels, Packages, Trains & more — all in one intelligent platform
        </p>

        {/* Search panel */}
        <div className="mt-8 w-full max-w-5xl rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.3)] lg:rounded-[2rem]">
          {/* Tabs */}
          <div className="flex overflow-x-auto rounded-t-3xl border-b border-[#E5E7EB] bg-[#F7F9FC] lg:rounded-t-[2rem]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 flex-col items-center gap-1 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider transition sm:flex-row sm:gap-2 sm:px-5 sm:py-4 sm:text-xs
                    ${active
                      ? "border-b-2 border-[#0057D9] bg-white text-[#0057D9] first:rounded-tl-3xl lg:first:rounded-tl-[2rem]"
                      : "text-[#6B7280] hover:text-[#374151]"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Search fields */}
          <div className="p-4 sm:p-5 lg:p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto]">
              {/* Destination with AI suggestions */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <div className={`flex cursor-text items-center gap-3 overflow-visible rounded-2xl border px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15 ${destError ? "animate-[shake_0.35s_ease-in-out] border-red-400 bg-red-50 ring-2 ring-red-300/40" : "border-[#E5E7EB] bg-[#F7F9FC]"}`}>
                  <MapPin className="h-4 w-4 shrink-0 text-[#0057D9]" />
                  <div className="min-w-0 flex-1 overflow-visible">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
                      {activeTab === "flights" ? "From" : "Destination"}
                    </p>
                    <SmartSearchBar
                      value={destination}
                      onChange={setDestination}
                      onAiSearch={handleAiSearch}
                      placeholder={activeTab === "flights" ? "City or Airport" : "City, property or landmark"}
                    />
                  </div>
                </div>
              </div>

              {/* Check In */}
              <div className="relative flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Check In</p>
                  <p className={`mt-0.5 text-sm font-medium ${checkIn ? "text-[#1A2235]" : "text-[#9CA3AF]"}`}>{checkIn || "Add date"}</p>
                </div>
                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => {
                    const newCheckIn = e.target.value;
                    setCheckIn(newCheckIn);
                    if (checkOut && newCheckIn >= checkOut) {
                      setCheckOut("");
                      if (checkOutTimerRef.current) clearTimeout(checkOutTimerRef.current);
                      setCheckOutError("Check-out must be after check-in");
                      checkOutTimerRef.current = setTimeout(() => setCheckOutError(""), 3000);
                    }
                  }}
                  className="absolute inset-0 w-full cursor-pointer opacity-0 [color-scheme:light]"
                  aria-label="Check-in date"
                />
              </div>

              {/* Check Out */}
              <div>
                <div className={`relative flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition ${
                  checkOutError
                    ? "animate-[shake_0.35s_ease-in-out] border-red-400 bg-red-50"
                    : "border-[#E5E7EB] bg-[#F7F9FC] focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15"
                }`}>
                  <CalendarDays className={`h-4 w-4 shrink-0 ${checkOutError ? "text-red-400" : "text-[#0057D9]"}`} />
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Check Out</p>
                    <p className={`mt-0.5 text-sm font-medium ${checkOut ? "text-[#1A2235]" : checkOutError ? "text-red-400" : "text-[#9CA3AF]"}`}>
                      {checkOut || "Add date"}
                    </p>
                  </div>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => {
                      const newCheckOut = e.target.value;
                      if (checkIn && newCheckOut <= checkIn) {
                        if (checkOutTimerRef.current) clearTimeout(checkOutTimerRef.current);
                        setCheckOutError("Check-out must be after check-in");
                        checkOutTimerRef.current = setTimeout(() => setCheckOutError(""), 3000);
                      } else {
                        setCheckOutError("");
                        setCheckOut(newCheckOut);
                      }
                    }}
                    className="absolute inset-0 w-full cursor-pointer opacity-0 [color-scheme:light]"
                    aria-label="Check-out date"
                  />
                </div>
                {checkOutError && (
                  <p className="mt-1 px-1 text-xs font-medium text-red-500">{checkOutError}</p>
                )}
              </div>

              {/* Guests */}
              <div className="relative flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15">
                <Users className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Guests</p>
                  <p className="mt-0.5 text-sm font-medium text-[#1A2235]">{guests} Guest{guests !== 1 ? "s" : ""}</p>
                </div>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="absolute inset-0 w-full cursor-pointer opacity-0" aria-label="Number of guests">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} Guest{n !== 1 ? "s" : ""}</option>)}
                </select>
              </div>

              {/* Search button */}
              <button onClick={handleSearch} className="flex items-center justify-center gap-2 rounded-2xl bg-[#0057D9] px-6 py-3.5 font-semibold text-white shadow-[0_8px_24px_rgba(0,87,217,0.35)] transition hover:-translate-y-0.5 hover:bg-[#003A8C] hover:shadow-[0_12px_32px_rgba(0,87,217,0.45)] active:translate-y-0 sm:col-span-2 lg:col-span-1" aria-label="Search rooms">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

            {/* AI smart suggestions strip */}
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#EEF4FF] bg-[#F5F8FF] px-4 py-2.5">
              <Sparkles className="h-4 w-4 shrink-0 text-[#0057D9]" />
              <p className="text-xs text-[#374151]">
                <span className="font-semibold text-[#0057D9]">AI suggests:</span>{" "}
                Prices for <strong>Goa</strong> drop 35% in the first week of July · <strong>Kerala</strong> monsoon packages are trending right now
              </p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: "2M+", label: "Happy Travelers" },
            { value: "50K+", label: "Hotels Listed" },
            { value: "500+", label: "Destinations" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-0.5 text-xs font-medium text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
