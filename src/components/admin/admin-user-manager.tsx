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
    <section className="space-y-5 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">People</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Manage users</h2>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <article
            key={user._id}
            className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-white/60">{user.email}</p>
            </div>
            <button
              onClick={() => void handleRoleToggle(user._id, user.role)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Make {user.role === "admin" ? "guest" : "admin"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
