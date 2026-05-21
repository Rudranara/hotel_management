"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    const payload =
      mode === "register"
        ? {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          }
        : {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          };

    setLoading(true);

    try {
      const url = mode === "register" ? "/api/register" : "/api/login";
      const response = await apiRequest<{ role: string }>(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success(response.message ?? "Welcome to Huts4u.");
      const next = searchParams.get("next");
      const destination = response.data.role === "admin" ? "/admin" : next || "/dashboard";

      startTransition(() => {
        router.push(destination);
        router.refresh();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
      {/* Brand mark */}
      <div className="mb-8">
        <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-sm font-semibold text-white backdrop-blur-md">
          H4
        </span>
        <p className="mt-1 text-xs uppercase tracking-[0.35em] text-amber-200">
          {mode === "register" ? "Create account" : "Welcome back"}
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-snug text-white sm:text-4xl">
          {mode === "register"
            ? "Start your journey with Huts4u."
            : "Sign in to your Huts4u account."}
        </h1>
      </div>

      <form
        action={(formData) => {
          void handleSubmit(formData);
        }}
        className="space-y-5"
      >
        {mode === "register" && (
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Full name</span>
            <input
              name="name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200/70 focus:bg-white/10"
              placeholder="Aarav Sharma"
            />
          </label>
        )}

        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Email address</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200/70 focus:bg-white/10"
            placeholder="guest@huts4u.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Password</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200/70 focus:bg-white/10"
              placeholder="Minimum 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white/80"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-100 disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/60">
        {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          href={mode === "register" ? "/login" : "/register"}
          className="font-semibold text-amber-200 transition hover:text-white"
        >
          {mode === "register" ? "Sign in" : "Register now"}
        </Link>
      </p>
    </div>
  );
}
