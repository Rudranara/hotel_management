"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(data.message ?? "Request failed.");
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
      <div className="mb-8">
        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#22C7C7]">Account recovery</p>
        <h1 className="mt-2 font-serif text-3xl leading-snug text-white">Forgot your password?</h1>
        <p className="mt-2 text-sm text-white/60">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      {sent ? (
        <div className="space-y-6">
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
            <div>
              <p className="font-semibold text-emerald-300">Check your inbox</p>
              <p className="mt-0.5 text-sm text-white/60">
                If <strong className="text-white">{email}</strong> is registered, we've sent a reset link. Check your spam folder too.
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={15} />
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Email address</span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-[#22C7C7]/70 focus-within:bg-white/10">
              <Mail size={16} className="shrink-0 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@huts4u.com"
                className="flex-1 bg-transparent text-white outline-none placeholder:text-white/35"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#22C7C7] px-5 py-3 font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </form>
      )}
    </div>
  );
}
