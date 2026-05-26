import {
  BedDouble, Calendar, CreditCard, Mail, MapPin, Phone, Shield, Star, User,
} from "lucide-react";

import { requireAuth, getDashboardData } from "@/lib/dal";
import { formatCurrency } from "@/utils/format";
import { diffInNights } from "@/utils/date";
import { ProfileForm } from "@/components/forms/profile-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Profile | Huts4u",
  description: "Manage your Huts4u profile and account details.",
};

function getLoyaltyTier(count: number) {
  if (count >= 10) return { label: "Platinum Member", bg: "bg-indigo-50 text-indigo-700 border border-indigo-200" };
  if (count >= 5)  return { label: "Gold Member",     bg: "bg-amber-50 text-amber-700 border border-amber-200"   };
  return                  { label: "Silver Member",   bg: "bg-slate-100 text-slate-600 border border-slate-200"  };
}

export default async function DashboardProfilePage() {
  const user = await requireAuth();
  const { bookings } = await getDashboardData(String(user._id));

  const now = new Date();
  const completed  = bookings.filter((b) => b.status === "completed");
  const totalSpent = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const totalNights = completed.reduce((sum, b) => sum + diffInNights(b.checkIn, b.checkOut), 0);

  const loyalty    = getLoyaltyTier(bookings.length);
  const initials   = user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const memberYear = new Date((user as { createdAt?: Date | string }).createdAt ?? now).getFullYear();
  const plainUser  = JSON.parse(JSON.stringify(user)) as {
    name: string; email: string; phone?: string; avatar?: string; address?: string; role?: string;
  };

  return (
    <div className="space-y-6">

      {/* ── Page title ─────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Account</p>
        <h1 className="mt-1.5 text-3xl font-bold text-[#111827]">Your profile</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Manage your personal details and account preferences</p>
      </div>

      {/* ── Identity card ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#22C7C7] via-[#1AB5B5] to-[#22C7C7]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#22C7C7]/5 to-transparent" />

        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:gap-7">
          {/* Avatar */}
          {plainUser.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={plainUser.avatar}
              alt={plainUser.name}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm ring-2 ring-[#22C7C7]/20"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22C7C7] to-[#1AB5B5] text-2xl font-bold text-white shadow-sm">
              {initials}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-[#111827]">{user.name}</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${loyalty.bg}`}>
                {loyalty.label}
              </span>
              {plainUser.role === "admin" && (
                <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 border border-violet-200">
                  <Shield className="h-3 w-3" />
                  Admin
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#22C7C7]" />
                {user.email}
              </span>
              {plainUser.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#22C7C7]" />
                  {plainUser.phone}
                </span>
              )}
              {plainUser.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#22C7C7]" />
                  {plainUser.address}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#22C7C7]" />
                Member since {memberYear}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB] bg-[#F8FAFC]">
          {[
            { icon: BedDouble,  label: "Total bookings",  value: bookings.length      },
            { icon: CreditCard, label: "Total spent",     value: formatCurrency(totalSpent) },
            { icon: Star,       label: "Nights stayed",   value: totalNights          },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-4 px-3 text-center">
              <Icon className="h-4 w-4 text-[#22C7C7]" />
              <p className="text-lg font-bold text-[#111827]">{value}</p>
              <p className="text-xs text-[#9CA3AF]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Edit form ──────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C7C7]/10">
            <User className="h-4 w-4 text-[#22C7C7]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#111827]">Personal information</h3>
            <p className="text-xs text-[#9CA3AF]">Update your name, contact details and address</p>
          </div>
        </div>
        <div className="p-6">
          <ProfileForm user={plainUser} />
        </div>
      </div>

      {/* ── Account details (read-only) ────────────────────── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            <Shield className="h-4 w-4 text-[#6B7280]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#111827]">Account details</h3>
            <p className="text-xs text-[#9CA3AF]">Read-only account information</p>
          </div>
        </div>
        <div className="grid gap-px bg-[#E5E7EB] sm:grid-cols-2">
          {[
            { label: "Email address",  value: user.email,                          note: "Cannot be changed" },
            { label: "Account role",   value: plainUser.role ?? "guest",            note: "Set by administrator" },
            { label: "Member since",   value: String(memberYear),                   note: "Year of registration" },
            { label: "Loyalty tier",   value: loyalty.label,                       note: `Based on ${bookings.length} booking${bookings.length !== 1 ? "s" : ""}` },
          ].map(({ label, value, note }) => (
            <div key={label} className="bg-white px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">{label}</p>
              <p className="mt-1 font-semibold capitalize text-[#111827]">{value}</p>
              <p className="mt-0.5 text-xs text-[#C5CBD3]">{note}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
