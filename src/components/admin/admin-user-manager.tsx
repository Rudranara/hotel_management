"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { ShieldCheck, UserRound, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

import { apiRequest } from "@/api/client";

type AdminUser = { _id: string; name: string; email: string; role: string; createdAt: string | Date };

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function fmtJoinDate(d: string | Date) {
  return new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

const AVATAR_COLORS = [
  "from-[#22C7C7] to-[#1AB5B5]",
  "from-violet-400 to-violet-600",
  "from-amber-400 to-amber-500",
  "from-emerald-400 to-emerald-600",
  "from-pink-400 to-pink-600",
  "from-sky-400 to-sky-600",
];

export function AdminUserManager({ users }: { users: AdminUser[] }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginated = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleRoleToggle(id: string, role: string) {
    try {
      await apiRequest("/api/users", {
        method: "PATCH",
        body: JSON.stringify({ id, role: role === "admin" ? "guest" : "admin" }),
      });
      toast.success("User role updated.");
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Role update failed.");
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="border-b border-[#E5E7EB] px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">People</p>
        <h2 className="mt-1.5 text-2xl font-semibold text-[#111827]">Manage users</h2>
      </div>

      {users.length === 0 ? (
        <div className="px-6 py-12 text-center text-[#9CA3AF]">No users found.</div>
      ) : (
        <>
          <div className="divide-y divide-[#F1F5F9]">
            {paginated.map((user, idx) => {
            const isAdmin = user.role === "admin";
            const gradient = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            return (
              <div
                key={user._id}
                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Avatar + info */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${gradient}`}
                  >
                    {initials(user.name)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#111827]">{user.name}</span>
                      {isAdmin ? (
                        <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">
                          <ShieldCheck className="h-3 w-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
                          <UserRound className="h-3 w-3" />
                          Guest
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
                      <span>{user.email}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {fmtJoinDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => void handleRoleToggle(user._id, user.role)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isAdmin
                      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
                  }`}
                >
                  {isAdmin ? "Revoke admin" : "Make admin"}
                </button>
              </div>
            );
          })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#E5E7EB] px-6 py-4 text-sm">
              <p className="text-[#9CA3AF]">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, users.length)} of {users.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F1F5F9] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-[#374151]">{page} / {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F1F5F9] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
