"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin, Hotel, Sparkles, TrendingUp, Search, Loader2, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Destination = { label: string; sublabel: string };
type RoomResult  = { label: string; sublabel: string; slug: string; price: number };

type AutocompleteResponse = {
  destinations: Destination[];
  rooms: RoomResult[];
  didYouMean: string | null;
  query: string;
};

type ParsedFilters = {
  destination?: string;
  type?: string;
  maxPrice?: number;
  minGuests?: number;
  query?: string;
};

export type AIFilters = ParsedFilters;

type RecentSearch = { text: string; slug?: string };

type NavItem =
  | { kind: "recent";      text: string; slug?: string }
  | { kind: "popular";     label: string; sublabel: string }
  | { kind: "dym";         correction: string }
  | { kind: "destination"; label: string; sublabel: string }
  | { kind: "room";        label: string; sublabel: string; slug: string }
  | { kind: "ai" };

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface SmartSearchBarProps {
  /** Controlled value (synced from parent) */
  value: string;
  /** Called when user confirms a destination or text */
  onChange: (value: string) => void;
  /** Called when AI search returns filters (parent handles navigation) */
  onAiSearch?: (filters: AIFilters) => void;
  placeholder?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const LS_KEY    = "huts4u_recent_searches";
const MAX_RECENT = 5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function loadRecent(): RecentSearch[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]") as RecentSearch[];
  } catch {
    return [];
  }
}

function saveRecent(item: RecentSearch, prev: RecentSearch[]): RecentSearch[] {
  const next = [item, ...prev.filter((r) => r.text !== item.text)].slice(0, MAX_RECENT);
  try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  return next;
}

// Does the query look like a natural-language phrase (2+ words)?
function looksLikeNlp(q: string) {
  return q.trim().split(/\s+/).length >= 2;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function SmartSearchBar({
  value,
  onChange,
  onAiSearch,
  placeholder = "Search destinations, hotels…",
  className = "",
}: SmartSearchBarProps) {
  const router = useRouter();

  const [inputQuery,   setInputQuery]   = useState(value);
  const [isOpen,       setIsOpen]       = useState(false);
  const [suggestions,  setSuggestions]  = useState<AutocompleteResponse | null>(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [isAiLoading,  setIsAiLoading]  = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(-1);
  const [recent,       setRecent]       = useState<RecentSearch[]>([]);
  const [popularDests, setPopularDests] = useState<Destination[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);
  const abortRef     = useRef<AbortController | null>(null);

  // Sync external value → internal display
  useEffect(() => { setInputQuery(value); }, [value]);

  // Load recent searches from localStorage (client-only)
  useEffect(() => { setRecent(loadRecent()); }, []);

  // Fetch popular destinations once on mount (empty query)
  useEffect(() => {
    void fetch("/api/search/autocomplete?q=")
      .then((r) => r.ok ? r.json() : null)
      .then((d: AutocompleteResponse | null) => {
        if (d?.destinations) setPopularDests(d.destinations);
      })
      .catch(() => { /* ignore */ });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Debounced autocomplete fetch when inputQuery changes
  useEffect(() => {
    if (!inputQuery.trim()) {
      setSuggestions(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      fetch(`/api/search/autocomplete?q=${encodeURIComponent(inputQuery)}`, {
        signal: abortRef.current.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d: AutocompleteResponse | null) => { if (d) setSuggestions(d); })
        .catch(() => { /* AbortError or network error */ })
        .finally(() => setIsLoading(false));
    }, 300);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
      setIsLoading(false);
    };
  }, [inputQuery]);

  // ---------------------------------------------------------------------------
  // Flat nav-item list for keyboard navigation
  // ---------------------------------------------------------------------------
  function getNavItems(): NavItem[] {
    const items: NavItem[] = [];

    if (!inputQuery.trim()) {
      // Empty → recent + popular
      for (const r of recent)       items.push({ kind: "recent", text: r.text, slug: r.slug });
      for (const p of popularDests) items.push({ kind: "popular", label: p.label, sublabel: p.sublabel });
    } else {
      // Has query → suggestions
      if (suggestions?.didYouMean) {
        items.push({ kind: "dym", correction: suggestions.didYouMean });
      }
      for (const d of (suggestions?.destinations ?? [])) {
        items.push({ kind: "destination", label: d.label, sublabel: d.sublabel });
      }
      for (const r of (suggestions?.rooms ?? [])) {
        items.push({ kind: "room", label: r.label, sublabel: r.sublabel, slug: r.slug });
      }
      if (looksLikeNlp(inputQuery)) {
        items.push({ kind: "ai" });
      }
    }

    return items;
  }

  // ---------------------------------------------------------------------------
  // Item selection
  // ---------------------------------------------------------------------------
  function handleSelectItem(item: NavItem) {
    switch (item.kind) {
      case "recent": {
        if (item.slug) {
          router.push(`/rooms/${item.slug}`);
        } else {
          setInputQuery(item.text);
          onChange(item.text);
        }
        setIsOpen(false);
        break;
      }
      case "popular":
      case "destination": {
        const label = item.label;
        setInputQuery(label);
        onChange(label);
        setRecent((prev) => saveRecent({ text: label }, prev));
        setIsOpen(false);
        break;
      }
      case "room": {
        setRecent((prev) => saveRecent({ text: item.label, slug: item.slug }, prev));
        setIsOpen(false);
        router.push(`/rooms/${item.slug}`);
        break;
      }
      case "dym": {
        setInputQuery(item.correction);
        onChange(item.correction);
        break;
      }
      case "ai": {
        void handleAiSearch();
        break;
      }
    }
    setActiveIndex(-1);
  }

  // ---------------------------------------------------------------------------
  // AI search
  // ---------------------------------------------------------------------------
  async function handleAiSearch() {
    if (!inputQuery.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/search/ai-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputQuery }),
      });
      const data = (await res.json()) as { filters?: ParsedFilters; error?: string };
      if (!res.ok || data.error) {
        // Fallback: plain text search
        onChange(inputQuery);
        setIsOpen(false);
        return;
      }
      const filters = data.filters ?? {};
      setIsOpen(false);
      if (onAiSearch) {
        onAiSearch(filters);
      } else {
        // Self-navigate when no parent handler provided
        const params = new URLSearchParams();
        if (filters.destination) params.set("location", filters.destination);
        if (filters.type)        params.set("type",     filters.type);
        if (filters.maxPrice)    params.set("maxPrice", String(filters.maxPrice));
        if (filters.minGuests)   params.set("guests",   String(filters.minGuests));
        if (filters.query)       params.set("location", filters.query);
        router.push(`/rooms?${params.toString()}`);
      }
    } catch {
      onChange(inputQuery);
      setIsOpen(false);
    } finally {
      setIsAiLoading(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const items = getNavItems();

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? -1 : i - 1));
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
      case "Enter": {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < items.length) {
          handleSelectItem(items[activeIndex]!);
        } else if (inputQuery.trim()) {
          if (looksLikeNlp(inputQuery)) {
            void handleAiSearch();
          } else {
            onChange(inputQuery);
            setIsOpen(false);
          }
        }
        break;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------
  const navItems         = getNavItems();
  const showEmpty        = !inputQuery.trim();
  const showDidYouMean   = Boolean(!showEmpty && suggestions?.didYouMean);
  const showDestinations = !showEmpty && (suggestions?.destinations.length ?? 0) > 0;
  const showRooms        = !showEmpty && (suggestions?.rooms.length ?? 0) > 0;
  const showNoResults    = !showEmpty && !isLoading && !showDidYouMean && !showDestinations && !showRooms;
  const showAiOption     = !showEmpty && (looksLikeNlp(inputQuery) || showNoResults);

  // Map navItems → flat index for active highlighting
  let itemIndex = 0;
  function nextIdx() { return itemIndex++; }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputQuery}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="mt-0.5 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] md:text-base"
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setInputQuery(e.target.value);
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        {/* Clear button */}
        {inputQuery && (
          <button
            type="button"
            className="shrink-0 text-[#9CA3AF] hover:text-[#6B7280]"
            onClick={() => {
              setInputQuery("");
              onChange("");
              setSuggestions(null);
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            aria-label="Clear"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {/* Loading spinner */}
        {isLoading && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#9CA3AF]" />}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-[200] mt-3 min-w-[320px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_40px_rgba(17,24,39,0.13)]"
        >
          {/* ── AI loading state ── */}
          {isAiLoading && (
            <div className="flex items-center gap-3 px-4 py-5">
              <Loader2 className="h-4 w-4 animate-spin text-[#0057D9]" />
              <span className="text-sm text-[#374151]">Analyzing your search with AI…</span>
            </div>
          )}

          {!isAiLoading && (
            <>
              {/* ── Empty state: Recent + Popular ── */}
              {showEmpty && (
                <>
                  {recent.length > 0 && (
                    <div className="pt-3">
                      <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">
                        Recent
                      </p>
                      {recent.map((r) => {
                        const idx = nextIdx();
                        return (
                          <button
                            key={r.text}
                            type="button"
                            role="option"
                            aria-selected={activeIndex === idx}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              activeIndex === idx ? "bg-[#EEF4FF]" : "hover:bg-[#F7F9FC]"
                            }`}
                            onClick={() => handleSelectItem({ kind: "recent", text: r.text, slug: r.slug })}
                          >
                            <Clock className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" />
                            <span className="truncate text-sm text-[#374151]">{r.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {popularDests.length > 0 && (
                    <div className={recent.length > 0 ? "border-t border-[#F3F4F6] pt-3" : "pt-3"}>
                      <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">
                        Popular Destinations
                      </p>
                      {popularDests.map((p) => {
                        const idx = nextIdx();
                        return (
                          <button
                            key={p.label}
                            type="button"
                            role="option"
                            aria-selected={activeIndex === idx}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              activeIndex === idx ? "bg-[#EEF4FF]" : "hover:bg-[#F7F9FC]"
                            }`}
                            onClick={() => handleSelectItem({ kind: "popular", label: p.label, sublabel: p.sublabel })}
                          >
                            <TrendingUp className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#111827]">{p.label}</p>
                              <p className="truncate text-xs text-[#9CA3AF]">{p.sublabel}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* ── Active query results ── */}
              {!showEmpty && (
                <>
                  {/* Did you mean */}
                  {showDidYouMean && suggestions?.didYouMean && (
                    <div className="px-4 pt-3 pb-2">
                      <button
                        type="button"
                        role="option"
                        aria-selected={activeIndex === nextIdx()}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#22C7C7]/40 bg-[#22C7C7]/10 px-3 py-1.5 text-xs font-medium text-[#0D9488] transition-colors hover:bg-[#22C7C7]/20"
                        onClick={() => handleSelectItem({ kind: "dym", correction: suggestions.didYouMean! })}
                      >
                        <Search className="h-3 w-3" />
                        Did you mean: <span className="font-semibold">{suggestions.didYouMean}</span>?
                      </button>
                    </div>
                  )}

                  {/* Destinations */}
                  {showDestinations && (
                    <div className={showDidYouMean ? "border-t border-[#F3F4F6] pt-3" : "pt-3"}>
                      <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">
                        Destinations
                      </p>
                      {suggestions!.destinations.map((d) => {
                        const idx = nextIdx();
                        return (
                          <button
                            key={d.label}
                            type="button"
                            role="option"
                            aria-selected={activeIndex === idx}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              activeIndex === idx ? "bg-[#EEF4FF]" : "hover:bg-[#F7F9FC]"
                            }`}
                            onClick={() => handleSelectItem({ kind: "destination", label: d.label, sublabel: d.sublabel })}
                          >
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0057D9]" />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#111827]">{d.label}</p>
                              <p className="truncate text-xs text-[#9CA3AF]">{d.sublabel}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Hotels */}
                  {showRooms && (
                    <div className={showDestinations ? "border-t border-[#F3F4F6] pt-3" : "pt-3"}>
                      <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">
                        Hotels
                      </p>
                      {suggestions!.rooms.map((r) => {
                        const idx = nextIdx();
                        return (
                          <button
                            key={r.slug}
                            type="button"
                            role="option"
                            aria-selected={activeIndex === idx}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              activeIndex === idx ? "bg-[#EEF4FF]" : "hover:bg-[#F7F9FC]"
                            }`}
                            onClick={() => handleSelectItem({ kind: "room", label: r.label, sublabel: r.sublabel, slug: r.slug })}
                          >
                            <Hotel className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-[#111827]">{r.label}</p>
                              <p className="truncate text-xs text-[#9CA3AF]">{r.sublabel}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* No results */}
                  {showNoResults && (
                    <div className="px-4 py-4 text-sm text-[#9CA3AF]">
                      No results for <span className="font-medium text-[#374151]">&ldquo;{inputQuery}&rdquo;</span>
                    </div>
                  )}

                  {/* AI Search option */}
                  {showAiOption && (
                    <div className={`border-t border-[#F3F4F6] p-3 ${showNoResults ? "pt-2" : ""}`}>
                      {(() => { const idx = nextIdx(); return (
                        <button
                          type="button"
                          role="option"
                          aria-selected={activeIndex === idx}
                          disabled={isAiLoading}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                            activeIndex === idx
                              ? "bg-[#EEF4FF]"
                              : "bg-gradient-to-r from-[#EEF4FF] to-[#F0FAFA] hover:from-[#DBEAFE] hover:to-[#CCFBF1]"
                          }`}
                          onClick={() => void handleAiSearch()}
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0057D9]">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#111827]">Search with AI</p>
                            <p className="truncate text-xs text-[#6B7280]">
                              {showNoResults
                                ? `Let AI find the best match for "${inputQuery}"`
                                : `"${inputQuery}" — extract filters automatically`}
                            </p>
                          </div>
                        </button>
                      ); })()}
                    </div>
                  )}
                </>
              )}

              {/* Bottom padding */}
              <div className="pb-1" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
