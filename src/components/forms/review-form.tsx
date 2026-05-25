"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

interface ReviewFormProps {
  roomId: string;
  roomName: string;
  bookingId: string;
}

export function ReviewForm({ roomId, roomName, bookingId }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ roomId, bookingId, rating, comment }),
      });
      toast.success("Review submitted — thank you!");
      setSubmitted(true);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
        Review submitted — thanks for sharing your experience!
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
      <p className="text-sm font-medium text-[#111827]">Leave a review for <span className="text-[#22C7C7]">{roomName}</span></p>

      {/* Star picker */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="transition hover:scale-110"
          >
            <Star
              className={`h-6 w-6 transition ${
                star <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-[#D1D5DB]"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        minLength={10}
        rows={3}
        placeholder="Share your experience..."
        className="w-full resize-none rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[#22C7C7] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
