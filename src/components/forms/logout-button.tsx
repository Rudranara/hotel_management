"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/logout", { method: "POST" });
      toast.success("Signed out successfully.");
      startTransition(() => {
        router.push("/login");
        router.refresh();
      });
    } catch {
      toast.error("Logout failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}
