"use client";

import type { ApiFailure, ApiSuccess } from "@/types";

export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ApiSuccess<T>> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json()) as ApiSuccess<T> | ApiFailure;

  if (!response.ok || !("success" in payload) || !payload.success) {
    throw new Error(("message" in payload && payload.message) || "Request failed");
  }

  return payload;
}
