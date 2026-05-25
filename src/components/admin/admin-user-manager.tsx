"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

export function AdminUserManager({
  users,
}: {
  users: Array<{ _id: string; name: string; email: string; role: string; createdAt: string | Date }>;
}) {
  const router = useRouter();

  async function handleRoleToggle(id: string, role: string) {
    try {
      await apiRequest("/api/users", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          role: role === "admin" ? "guest" : "admin",
        }),
      });
      toast.success("User role updated.");
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Role update failed.");
    }
  }

  return (
    <section className="space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">People</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#111827]">Manage users</h2>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <article
            key={user._id}
            className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-base font-semibold text-[#111827]">{user.name}</h3>
              <p className="text-sm text-[#6B7280]">{user.email}</p>
            </div>
            <button
              onClick={() => void handleRoleToggle(user._id, user.role)}
              className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#374151] transition hover:border-[#22C7C7]/40 hover:bg-[#22C7C7]/5 hover:text-[#22C7C7]"
            >
              Make {user.role === "admin" ? "guest" : "admin"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
