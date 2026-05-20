"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
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
    <div className="w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
          {mode === "register" ? "Create account" : "Welcome back"}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-white">
          {mode === "register" ? "Start managing stays beautifully." : "Sign in to your Huts4u console."}
        </h1>
      </div>

      <form
        action={(formData) => {
          void handleSubmit(formData);
        }}
        className="space-y-5"
      >
        {mode === "register" ? (
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Full name</span>
            <input
              name="name"
              type="text"
              required
              minLength={2}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200"
              placeholder="Aarav Sharma"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200"
            placeholder="guest@huts4u.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200"
            placeholder="Minimum 8 characters"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-100 disabled:opacity-60"
        >
          {loading ? "Please wait..." : mode === "register" ? "Create account" : "Login"}
        </button>
      </form>

      <p className="mt-6 text-sm text-white/60">
        {mode === "register" ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={mode === "register" ? "/login" : "/register"}
          className="font-semibold text-amber-200 transition hover:text-white"
        >
          {mode === "register" ? "Login here" : "Register now"}
        </Link>
      </p>
    </div>
  );
}
