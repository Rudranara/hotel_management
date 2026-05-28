"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, X, Send, Bot, User, Plane, Hotel, MapPin, DollarSign, Calendar, AlertCircle } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string; time: string };

const quickPrompts = [
  { icon: MapPin,     label: "Plan a trip to Goa"           },
  { icon: Hotel,      label: "Best budget hotels in Manali"  },
  { icon: Plane,      label: "Cheapest flights this weekend" },
  { icon: DollarSign, label: "Budget trip for ₹20,000"       },
  { icon: Calendar,   label: "7-day Kerala itinerary"        },
];

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: "assistant",
      text: "Hi! I'm your AI Travel Assistant powered by Google Gemini. I can help you plan trips, find hotels, compare flights, and build itineraries. Where do you want to go?",
      time: now(),
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          // Pass prior turns (exclude the welcome message to save tokens)
          history: messages.slice(1).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json() as { reply?: string; error?: string };

      if (res.status === 429) {
        throw new Error(data.error ?? "The AI is busy right now. Please wait a moment and try again.");
      }
      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply ?? "No response.", time: now() },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to connect. Try again.";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Sorry, I ran into an issue: ${msg}`, time: now() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

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
            <p className="text-xs text-white/60">Powered by Google Gemini</p>
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
                  disabled={loading}
                  className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F7F9FC] px-2.5 py-1 text-[11px] font-medium text-[#374151] transition hover:border-[#0057D9] hover:bg-[#EEF4FF] hover:text-[#0057D9] disabled:opacity-50"
                >
                  <Icon className="h-3 w-3" />
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 px-4 py-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "assistant" ? "bg-[#EEF4FF] text-[#0057D9]" : "bg-[#FF6B35] text-white"}`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`max-w-[75%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "assistant" ? "bg-[#F7F9FC] text-[#1A2235]" : "bg-[#0057D9] text-white"
                }`}>
                  {msg.text}
                </div>
                <p className="mt-1 text-[10px] text-[#9CA3AF]">{msg.time}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
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

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
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
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask me anything about travel..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-[#1A2235] placeholder:text-[#9CA3AF] focus:outline-none disabled:opacity-60"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
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
