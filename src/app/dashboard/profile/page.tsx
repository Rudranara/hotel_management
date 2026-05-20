import { requireAuth } from "@/lib/dal";

import { ProfileForm } from "@/components/forms/profile-form";

export const dynamic = "force-dynamic";

export default async function DashboardProfilePage() {
  const user = await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-white/40">Profile</p>
        <h1 className="mt-3 font-serif text-5xl text-white">Keep guest details current</h1>
      </div>
      <ProfileForm user={{ ...user, email: user.email }} />
    </div>
  );
}
