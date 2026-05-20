"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: string;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      await apiRequest("/api/users/profile", {
        method: "PATCH",
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          avatar: String(formData.get("avatar") ?? ""),
          address: String(formData.get("address") ?? ""),
        }),
      });

      toast.success("Profile updated.");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="space-y-5 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Name</span>
          <input
            name="name"
            defaultValue={user.name}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Email</span>
          <input
            value={user.email}
            disabled
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/50 outline-none"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Phone</span>
          <input
            name="phone"
            defaultValue={user.phone ?? ""}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Avatar URL</span>
          <input
            name="avatar"
            defaultValue={user.avatar ?? ""}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-white/70">Address</span>
        <textarea
          name="address"
          defaultValue={user.address ?? ""}
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-200"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-100 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
