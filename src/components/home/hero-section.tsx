"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Plane, Hotel, Package, Car, Train, Bus,
  MapPin, CalendarDays, Users, Search, Sparkles,
  TrendingUp, Clock, Mic,
} from "lucide-react";

const tabs = [
  { id: "hotels",   label: "Hotels",           icon: Hotel   },
  { id: "flights",  label: "Flights",          icon: Plane   },
  { id: "packages", label: "Holiday Packages", icon: Package },
  { id: "cabs",     label: "Cabs",             icon: Car     },
  { id: "trains",   label: "Trains",           icon: Train   },
  { id: "bus",      label: "Bus",              icon: Bus     },
];

const trendingDestinations = [
  "Goa Beaches", "Manali Snow", "Kerala Backwaters", "Rajasthan Forts", "Andaman Islands",
];

const recentSearches = ["Puri · 2 Adults · Jun 15", "Bhubaneswar · 1 Adult · Jun 20"];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("hotels");
  const [destination, setDestination] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background */}
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
                <div
                  className="flex cursor-text items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15"
                  onClick={() => setShowSuggestions(true)}
                >
                  <MapPin className="h-4 w-4 shrink-0 text-[#0057D9]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
                      {activeTab === "flights" ? "From" : "Destination"}
                    </p>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder={activeTab === "flights" ? "City or Airport" : "City, property or landmark"}
                      className="mt-0.5 w-full bg-transparent text-sm font-medium text-[#1A2235] placeholder:text-[#9CA3AF] focus:outline-none"
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                  </div>
                  <button className="shrink-0 rounded-full p-1.5 text-[#6B7280] transition hover:bg-[#E5E7EB]" aria-label="Voice search">
                    <Mic className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[280px] rounded-2xl border border-[#E5E7EB] bg-white py-2 shadow-2xl">
                    {recentSearches.length > 0 && (
                      <div className="px-3 pb-2">
                        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
                          <Clock className="h-3 w-3" />Recent Searches
                        </p>
                        {recentSearches.map((s) => (
                          <button key={s} className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-sm text-[#374151] transition hover:bg-[#F7F9FC]">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" />
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-[#F1F5F9] px-3 pt-2">
                      <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
                        <TrendingUp className="h-3 w-3" />Trending Now
                      </p>
                      {trendingDestinations.map((d) => (
                        <button
                          key={d}
                          onMouseDown={() => setDestination(d)}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-sm text-[#374151] transition hover:bg-[#F7F9FC]"
                        >
                          <TrendingUp className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
                          {d}
                        </button>
                      ))}
                    </div>
                    {/* AI suggestion strip */}
                    <div className="mx-3 mt-2 flex items-center gap-2 rounded-xl bg-[#EEF4FF] px-3 py-2.5">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#0057D9]" />
                      <p className="text-xs text-[#0057D9]"><strong>AI Tip:</strong> Weekend in Goa is 40% cheaper next week</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Check In */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Check In</p>
                  <input type="date" className="mt-0.5 bg-transparent text-sm font-medium text-[#1A2235] focus:outline-none" />
                </div>
              </div>

              {/* Check Out */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Check Out</p>
                  <input type="date" className="mt-0.5 bg-transparent text-sm font-medium text-[#1A2235] focus:outline-none" />
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3.5 transition focus-within:border-[#0057D9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0057D9]/15">
                <Users className="h-4 w-4 shrink-0 text-[#0057D9]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Guests</p>
                  <p className="mt-0.5 text-sm font-medium text-[#1A2235]">2 Adults, 1 Room</p>
                </div>
              </div>

              {/* Search button */}
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#0057D9] px-6 py-3.5 font-semibold text-white shadow-[0_8px_24px_rgba(0,87,217,0.35)] transition hover:-translate-y-0.5 hover:bg-[#003A8C] hover:shadow-[0_12px_32px_rgba(0,87,217,0.45)] active:translate-y-0 sm:col-span-2 lg:col-span-1">
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
