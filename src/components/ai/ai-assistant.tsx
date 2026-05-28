"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Plane, Hotel, MapPin, DollarSign, Calendar } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string; time: string };

const quickPrompts = [
  { icon: MapPin,     label: "Plan a trip to Goa"           },
  { icon: Hotel,      label: "Best budget hotels in Manali"  },
  { icon: Plane,      label: "Cheapest flights this weekend" },
  { icon: DollarSign, label: "Budget trip for ₹20,000"       },
  { icon: Calendar,   label: "7-day Kerala itinerary"        },
];

const botReplies: Record<string, string> = {
  default: "I'd love to help you plan the perfect trip! Try asking me about destinations, hotels, flights, or budgets.",
  goa: "Goa is perfect year-round! Best time: October–March. I recommend staying at North Goa for beaches or South Goa for serenity. Budget: ₹8,000–₹25,000/night. Want me to find deals?",
  manali: "Manali in winter is magical! For budget stays, try Old Manali hostels (₹500–₹1,500/night). Mid-range: The Orchard Greens (₹3,000–₹6,000). I found 3 hotels with 40% off this week!",
  flights: "I found great deals! Delhi→Goa from ₹2,800 (Thu/Fri departures are cheapest). Want me to check your specific dates?",
  budget: "For ₹20,000, I can plan 4 nights in Rishikesh with adventure activities, OR 3 nights in Coorg with stays in a coffee estate resort. Which sounds better?",
  kerala: "A perfect 7-day Kerala itinerary: Day 1–2: Kochi (Fort Kochi heritage); Day 3–4: Munnar (tea gardens); Day 5–6: Alleppey (backwater houseboat); Day 7: Kovalam beach. Estimated budget: ₹35,000–₹55,000/person.",
};

function getReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("goa")) return botReplies.goa;
  if (lower.includes("manali")) return botReplies.manali;
  if (lower.includes("flight")) return botReplies.flights;
  if (lower.includes("budget") || lower.includes("20,000") || lower.includes("20000")) return botReplies.budget;
  if (lower.includes("kerala")) return botReplies.kerala;
  return botReplies.default;
}

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Populate welcome message on client only to prevent SSR/hydration time mismatch
  useEffect(() => {
    setMessages([{
      role: "assistant",
      text: "Hi! I'm your AI Travel Assistant. I can help you plan trips, find hotels, compare flights, and build itineraries. Where do you want to go?",
      time: now(),
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", text: getReply(text), time: now() }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="AI Travel Assistant"
        className={`ai-pulse fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0057D9] text-white shadow-[0_8px_32px_rgba(0,87,217,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#003A8C] sm:h-16 sm:w-16 ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
      >
        <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] transition-all duration-500 ${
          open
            ? "h-[600px] w-[380px] scale-100 opacity-100 sm:h-[640px] sm:w-[420px]"
            : "pointer-events-none h-0 w-0 scale-90 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#0057D9] to-[#1E40AF] px-5 py-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#0057D9] bg-[#22C55E]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">AI Travel Assistant</p>
            <p className="text-xs text-white/60">Powered by Huts4u Intelligence</p>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick prompts */}
        <div className="border-b border-[#F1F5F9] px-4 py-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Quick Ask</p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((q) => {
              const Icon = q.icon;
              return (
                <button
                  key={q.label}
                  onClick={() => send(q.label)}
                  className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-2.5 py-1 text-[11px] font-medium text-[#374151] transition hover:border-[#0057D9] hover:bg-[#EEF4FF] hover:text-[#0057D9]"
                >
                  <Icon className="h-3 w-3" />
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "assistant" ? "bg-[#EEF4FF] text-[#0057D9]" : "bg-[#FF6B35] text-white"}`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-[#F7F9FC] text-[#1A2235]"
                    : "bg-[#0057D9] text-white"
                }`}>
                  {msg.text}
                </div>
                <p className="mt-1 text-[10px] text-[#9CA3AF]">{msg.time}</p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-[#0057D9]">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-[#F7F9FC] px-4 py-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2 w-2 rounded-full bg-[#0057D9]/40" style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#F1F5F9] p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-[#F7F9FC] px-4 py-2.5 transition focus-within:border-[#0057D9] focus-within:ring-2 focus-within:ring-[#0057D9]/15">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask me anything about travel..."
              className="flex-1 bg-transparent text-sm text-[#1A2235] placeholder:text-[#9CA3AF] focus:outline-none"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0057D9] text-white transition hover:bg-[#003A8C] disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-[#9CA3AF]">AI responses are suggestions. Always verify before booking.</p>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)} }`}</style>
    </>
  );
}
