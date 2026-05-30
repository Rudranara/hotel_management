"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function RemoveFromWishlist({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Removed from wishlist.");
      router.refresh();
    } catch {
      toast.error("Could not remove from wishlist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      aria-label="Remove from wishlist"
      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#EF4444] shadow transition hover:bg-white hover:shadow-md disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
