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

  const inputCls = "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20 placeholder:text-[#9CA3AF]";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#6B7280]";

  return (
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Name</span>
          <input
            name="name"
            defaultValue={user.name}
            required
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Email</span>
          <input
            value={user.email}
            disabled
            className={`${inputCls} cursor-not-allowed bg-[#F8FAFC] text-[#9CA3AF]`}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input
            name="phone"
            defaultValue={user.phone ?? ""}
            className={inputCls}
            placeholder="+91 00000 00000"
          />
        </label>
        <label className="block">
          <span className={labelCls}>Avatar URL</span>
          <input
            name="avatar"
            defaultValue={user.avatar ?? ""}
            className={inputCls}
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>Address</span>
        <textarea
          name="address"
          defaultValue={user.address ?? ""}
          rows={3}
          className={`${inputCls} resize-none`}
          placeholder="Your address..."
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[#22C7C7] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1AB5B5] disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
