import { cn } from "@/utils/cn";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white",
        className,
      )}
    />
  );
}
