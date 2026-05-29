"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin, Hotel, Sparkles, TrendingUp, Search, Loader2, X, ArrowLeft, Mic, MicOff } from "lucide-react";

// ---------------------------------------------------------------------------
// Web Speech API — not in standard TS lib; declare locally
// ---------------------------------------------------------------------------
interface SpeechRecognition extends EventTarget {
  continuous:      boolean;
  interimResults:  boolean;
  lang:            string;
  start():         void;
  stop():          void;
  abort():         void;
  onresult:  ((event: SpeechRecognitionEvent)             => void) | null;
  onerror:   ((event: { error: string })                  => void) | null;
  onend:     (() => void) | null;
}
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
declare global {
  interface Window {
    SpeechRecognition?:       { new(): SpeechRecognition };
    webkitSpeechRecognition?: { new(): SpeechRecognition };
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Destination = { label: string; sublabel: string; roomCount?: number };
type RoomResult  = { label: string; sublabel: string; slug: string; price: number; image?: string };

type AiSearchEntry = { query: string; label: string; filters: ParsedFilters };

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [suggestions,  setSuggestions]  = useState<AutocompleteResponse | null>(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [isAiLoading,  setIsAiLoading]  = useState(false);
  const [aiResult,     setAiResult]     = useState<{ label: string; filters: ParsedFilters } | null>(null);
  const [activeIndex,  setActiveIndex]  = useState(-1);
  const [recent,       setRecent]       = useState<RecentSearch[]>([]);
  const [popularDests, setPopularDests] = useState<Destination[]>([]);
  // voice search
  const [isListening,  setIsListening]  = useState(false);
  const [voiceError,   setVoiceError]   = useState("");
  // hover preview
  const [hoveredRoom,  setHoveredRoom]  = useState<RoomResult | null>(null);
  // AI search history
  const [lastAiSearch, setLastAiSearch] = useState<AiSearchEntry | null>(null);

  const containerRef   = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);
  const abortRef       = useRef<AbortController | null>(null);
  const popularFetched = useRef(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Sync external value → internal display
  useEffect(() => { setInputQuery(value); }, [value]);

  // Load recent searches from localStorage (client-only)
  useEffect(() => { setRecent(loadRecent()); }, []);

  // Fetch popular destinations once per page load (cached)
  useEffect(() => {
    if (popularFetched.current) return;
    popularFetched.current = true;
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

  function clearRecent() {
    try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
    setRecent([]);
  }

  // ---------------------------------------------------------------------------
  // Voice search
  // ---------------------------------------------------------------------------
  function startVoiceSearch() {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceError("Voice search not supported in this browser");
      setTimeout(() => setVoiceError(""), 3000);
      return;
    }

    // Toggle off if already listening
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SR();
    recognitionRef.current  = recognition;
    recognition.continuous     = false;
    recognition.interimResults = true;
    recognition.lang           = "en-IN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results.item(i).item(0).transcript;
      }
      setInputQuery(transcript);
      onChange(transcript);
      setIsOpen(true);
      setActiveIndex(-1);
    };

    recognition.onerror = (event: { error: string }) => {
      if (event.error !== "aborted") {
        setVoiceError(
          event.error === "not-allowed"
            ? "Microphone access denied"
            : "Voice recognition error",
        );
        setTimeout(() => setVoiceError(""), 3000);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    setVoiceError("");
  }

  // ---------------------------------------------------------------------------
  // Fetch last AI search (for logged-in users)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    void fetch("/api/search/ai-history")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { entry?: AiSearchEntry | null } | null) => {
        if (d?.entry) setLastAiSearch(d.entry);
      })
      .catch(() => { /* ignore */ });
  }, []);
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

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
    setIsOpen(false);
    try {
      const res = await fetch("/api/search/ai-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputQuery }),
      });
      const data = (await res.json()) as { filters?: ParsedFilters; error?: string };
      if (!res.ok || data.error) {
        onChange(inputQuery);
        return;
      }
      const filters = data.filters ?? {};

      // Build human-readable label for the AI result banner
      const parts: string[] = [];
      if (filters.destination) parts.push(filters.destination);
      if (filters.type)        parts.push(filters.type);
      if (filters.maxPrice)    parts.push(`under ₹${filters.maxPrice.toLocaleString("en-IN")}`);
      if (filters.minGuests)   parts.push(`${filters.minGuests}+ guests`);
      const label = parts.length > 0 ? parts.join(" · ") : inputQuery;

      // Persist to DB (fire and forget — works only for logged-in users)
      const historyEntry: AiSearchEntry = { query: inputQuery, label, filters };
      void fetch("/api/search/ai-history", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(historyEntry),
      }).then((r) => { if (r.ok) setLastAiSearch(historyEntry); }).catch(() => { /* ignore */ });

      // Show the "AI found" banner for 1.5s, then navigate
      setAiResult({ label, filters });
      await new Promise((r) => setTimeout(r, 1500));
      setAiResult(null);

      if (onAiSearch) {
        onAiSearch(filters);
      } else {
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
  const showEmpty        = !inputQuery.trim();
  const showDidYouMean   = Boolean(!showEmpty && suggestions?.didYouMean);
  const showDestinations = !showEmpty && (suggestions?.destinations.length ?? 0) > 0;
  const showRooms        = !showEmpty && (suggestions?.rooms.length ?? 0) > 0;
  const showNoResults    = !showEmpty && !isLoading && !showDidYouMean && !showDestinations && !showRooms;
  const showAiOption     = !showEmpty && (looksLikeNlp(inputQuery) || showNoResults);

  // ---------------------------------------------------------------------------
  // Shared dropdown content (used in both desktop dropdown + mobile overlay)
  // ---------------------------------------------------------------------------
  function DropdownContent() {
    let itemIndex2 = 0;
    function idx2() { return itemIndex2++; }

    return (
      <>
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
                {/* Last AI search (logged-in users) */}
                {lastAiSearch && (
                  <div className="pt-3">
                    <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">Last AI Search</p>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#F7F9FC]"
                      onClick={() => {
                        setInputQuery(lastAiSearch.query);
                        onChange(lastAiSearch.query);
                        if (onAiSearch) {
                          onAiSearch(lastAiSearch.filters);
                        } else {
                          void handleAiSearch();
                        }
                        setIsOpen(false);
                        setIsMobileOpen(false);
                      }}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0057D9]/10">
                        <Sparkles className="h-3 w-3 text-[#0057D9]" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#111827]">{lastAiSearch.label}</p>
                        <p className="truncate text-xs text-[#9CA3AF]">AI · {lastAiSearch.query}</p>
                      </div>
                    </button>
                  </div>
                )}
                {recent.length > 0 && (
                  <div className="pt-3">
                    <div className="flex items-center justify-between px-4 pb-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">Recent</p>
                      <button
                        type="button"
                        onClick={clearRecent}
                        className="text-[10px] font-medium text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    {recent.map((r) => {
                      const idx = idx2();
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
                    <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">Popular Destinations</p>
                    {popularDests.map((p) => {
                      const idx = idx2();
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
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#111827]">{p.label}</p>
                            <p className="truncate text-xs text-[#9CA3AF]">
                              {p.sublabel}
                              {typeof p.roomCount === "number" && (
                                <span className="ml-1.5 font-medium text-[#0057D9]">· {p.roomCount} room{p.roomCount !== 1 ? "s" : ""}</span>
                              )}
                            </p>
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
                {showDidYouMean && suggestions?.didYouMean && (
                  <div className="px-4 pt-3 pb-2">
                    <button
                      type="button"
                      role="option"
                      aria-selected={activeIndex === idx2()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#22C7C7]/40 bg-[#22C7C7]/10 px-3 py-1.5 text-xs font-medium text-[#0D9488] transition-colors hover:bg-[#22C7C7]/20"
                      onClick={() => handleSelectItem({ kind: "dym", correction: suggestions.didYouMean! })}
                    >
                      <Search className="h-3 w-3" />
                      Did you mean: <span className="font-semibold">{suggestions.didYouMean}</span>?
                    </button>
                  </div>
                )}

                {showDestinations && (
                  <div className={showDidYouMean ? "border-t border-[#F3F4F6] pt-3" : "pt-3"}>
                    <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">Destinations</p>
                    {suggestions!.destinations.map((d) => {
                      const idx = idx2();
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
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#111827]">{d.label}</p>
                            <p className="truncate text-xs text-[#9CA3AF]">
                              {d.sublabel}
                              {typeof d.roomCount === "number" && (
                                <span className="ml-1.5 font-medium text-[#0057D9]">· {d.roomCount} room{d.roomCount !== 1 ? "s" : ""}</span>
                              )}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {showRooms && (
                  <div className={showDestinations ? "border-t border-[#F3F4F6] pt-3" : "pt-3"}>
                    <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]">Hotels</p>
                    {suggestions!.rooms.map((r) => {
                      const idx = idx2();
                      return (
                        <button
                          key={r.slug}
                          type="button"
                          role="option"
                          aria-selected={activeIndex === idx}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            activeIndex === idx ? "bg-[#EEF4FF]" : "hover:bg-[#F7F9FC]"
                          }`}
                          onMouseEnter={() => setHoveredRoom(r)}
                          onMouseLeave={() => setHoveredRoom(null)}
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

                {showNoResults && (
                  <div className="px-4 py-4 text-sm text-[#9CA3AF]">
                    No results for <span className="font-medium text-[#374151]">&ldquo;{inputQuery}&rdquo;</span>
                  </div>
                )}

                {showAiOption && (
                  <div className={`border-t border-[#F3F4F6] p-3 ${showNoResults ? "pt-2" : ""}`}>
                    {(() => { const idx = idx2(); return (
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

            <div className="pb-1" />
          </>
        )}
      </>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* AI result banner — shown for 1.5s after AI search */}
      {aiResult && (
        <div className="absolute -top-10 left-0 right-0 z-[201] flex animate-in fade-in slide-in-from-top-1 duration-200 items-center gap-2 rounded-xl border border-[#0057D9]/20 bg-[#EEF4FF] px-3 py-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0057D9]" />
          <p className="text-xs text-[#1E40AF]">
            <span className="font-semibold">AI found:</span> {aiResult.label}
          </p>
        </div>
      )}

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
          onFocus={() => {
            // On mobile (narrow viewport), open full-screen overlay instead
            if (window.innerWidth < 640) {
              setIsMobileOpen(true);
            } else {
              setIsOpen(true);
            }
          }}
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
        {isLoading && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#9CA3AF]" />}
        {/* Mic button */}
        {!isLoading && (
          <button
            type="button"
            aria-label={isListening ? "Stop listening" : "Voice search"}
            onClick={startVoiceSearch}
            className={`shrink-0 rounded-full p-0.5 transition-colors ${
              isListening
                ? "text-[#EF4444] hover:text-red-700"
                : "text-[#9CA3AF] hover:text-[#0057D9]"
            }`}
          >
            {isListening ? (
              <MicOff className="h-3.5 w-3.5" />
            ) : (
              <Mic className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
      {/* Voice error toast */}
      {voiceError && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-500">{voiceError}</p>
      )}

      {/* ── Desktop dropdown ── */}
      {isOpen && (
        <div className="absolute left-0 top-full z-[200] mt-3 flex items-start">
          {/* Main list */}
          <div
            role="listbox"
            className="min-w-[320px] animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_40px_rgba(17,24,39,0.13)]"
            onMouseLeave={() => setHoveredRoom(null)}
          >
            <DropdownContent />
          </div>
          {/* Hover preview panel */}
          {hoveredRoom && (
            <div className="ml-3 w-60 animate-in fade-in slide-in-from-left-2 duration-150 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_40px_rgba(17,24,39,0.13)]">
              {hoveredRoom.image ? (
                <div className="relative h-36 w-full">
                  <Image
                    src={hoveredRoom.image}
                    alt={hoveredRoom.label}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-36 w-full items-center justify-center bg-[#F7F9FC]">
                  <Hotel className="h-10 w-10 text-[#D1D5DB]" />
                </div>
              )}
              <div className="p-3">
                <p className="line-clamp-2 text-sm font-semibold text-[#111827]">{hoveredRoom.label}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">{hoveredRoom.sublabel.split(" · ")[0]}</p>
                <p className="mt-2 text-base font-bold text-[#0057D9]">
                  ₹{hoveredRoom.price.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-[#9CA3AF]">/night</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Mobile full-screen overlay ── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[300] flex flex-col bg-white animate-in fade-in duration-150 sm:hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-4 py-3">
            <button
              type="button"
              onClick={() => { setIsMobileOpen(false); setIsOpen(false); }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-[#F3F4F6]"
              aria-label="Close"
            >
              <ArrowLeft className="h-5 w-5 text-[#374151]" />
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-[#0057D9] bg-[#F7F9FC] px-4 py-2.5 ring-2 ring-[#0057D9]/15">
              <MapPin className="h-4 w-4 shrink-0 text-[#0057D9]" />
              <input
                type="text"
                value={inputQuery}
                placeholder={placeholder}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                autoFocus
                className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                onChange={(e) => {
                  setInputQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
              />
              {inputQuery && (
                <button
                  type="button"
                  onClick={() => { setInputQuery(""); onChange(""); setSuggestions(null); }}
                  aria-label="Clear"
                >
                  <X className="h-4 w-4 text-[#9CA3AF]" />
                </button>
              )}
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-[#9CA3AF]" />}
              {!isLoading && (
                <button
                  type="button"
                  aria-label={isListening ? "Stop listening" : "Voice search"}
                  onClick={startVoiceSearch}
                  className={`rounded-full p-0.5 transition-colors ${
                    isListening ? "text-[#EF4444]" : "text-[#9CA3AF] hover:text-[#0057D9]"
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Scrollable results */}
          <div className="flex-1 overflow-y-auto">
            <DropdownContent />
          </div>
        </div>
      )}
    </div>
  );
}
