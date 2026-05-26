"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F1F5F9] px-4 text-center">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#111827]">Something went wrong</h1>
        <p className="mt-3 text-sm text-[#6B7280]">
          An unexpected error occurred. This has been noted and we&apos;re working on it.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-xs text-[#9CA3AF]">Ref: {error.digest}</p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22C7C7] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-medium text-[#374151] transition hover:shadow-sm"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
