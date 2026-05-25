import { requireAuth } from "@/lib/dal";

import { ProfileForm } from "@/components/forms/profile-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Profile | Huts4u",
  description: "Manage your Huts4u profile and account details.",
};

export default async function DashboardProfilePage() {
  const user = await requireAuth();
  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#22C7C7]">Profile</p>
        <h1 className="mt-2 text-3xl font-bold text-[#111827]">Your profile</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Keep your personal details up to date</p>
      </div>
      <ProfileForm user={plainUser} />
    </div>
  );
}
