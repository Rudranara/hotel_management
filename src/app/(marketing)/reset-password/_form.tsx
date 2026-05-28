"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
        <AlertCircle size={40} className="mx-auto text-red-400" />
        <p className="mt-4 font-semibold text-white">Invalid reset link</p>
        <p className="mt-2 text-sm text-white/60">This link is missing a token. Please request a new one.</p>
        <Link href="/forgot-password" className="mt-6 inline-block rounded-full bg-[#22C7C7] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]">
          Request new link
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(data.message ?? "Reset failed.");
      toast.success("Password updated! Signing you in…");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#22C7C7]">Set new password</p>
        <h1 className="mt-2 font-serif text-3xl leading-snug text-white">Choose a new password</h1>
        <p className="mt-2 text-sm text-white/60">Must be at least 8 characters.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">New password</span>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-white/35 focus:border-[#22C7C7]/70 focus:bg-white/10"
            />
            <button type="button" onClick={() => setShow((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Confirm password</span>
          <input
            type={show ? "text" : "password"}
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#22C7C7]/70 focus:bg-white/10"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#22C7C7] px-5 py-3 font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
        >
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
