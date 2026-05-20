import { EmptyState } from "@/components/empty-state";

export function SetupNotice() {
  return (
    <EmptyState
      title="Database setup needed"
      description="Create a .env.local file with MONGODB_URI and JWT_SECRET, then restart the Next.js server to load your hotel data."
    />
  );
}
