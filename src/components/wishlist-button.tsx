"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

interface WishlistButtonProps {
  roomId: string;
  initialSaved: boolean;
  /** Small variant for cards, default renders a standalone button */
  size?: "sm" | "md";
}

export function WishlistButton({ roomId, initialSaved, size = "sm" }: WishlistButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      if (res.status === 401) {
        toast.error("Sign in to save rooms to your wishlist.");
        return;
      }
      if (!res.ok) throw new Error("Request failed.");
      const data = (await res.json()) as { data?: { saved: boolean }; message?: string };
      const nextSaved = data.data?.saved ?? !saved;
      setSaved(nextSaved);
      toast.success(nextSaved ? "Saved to wishlist!" : "Removed from wishlist.");
    } catch {
      toast.error("Could not update wishlist.");
    } finally {
      setLoading(false);
    }
  }

  const sm = size === "sm";

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={`flex items-center justify-center rounded-full transition ${
        sm
          ? "h-8 w-8 bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white"
          : "h-10 w-10 border border-[#E5E7EB] bg-white shadow-sm hover:border-red-200 hover:bg-red-50"
      } disabled:opacity-60`}
    >
      <Heart
        size={sm ? 15 : 18}
        className={`transition ${saved ? "fill-red-500 text-red-500" : "text-[#64748B]"}`}
      />
    </button>
  );
}
