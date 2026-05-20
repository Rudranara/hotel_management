"use client";

import { useEffect, useState } from "react";

export function useAuthUser() {
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/users");
        const payload = await response.json();
        setUser(payload.data ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    void loadUser();
  }, []);

  return { user, loading };
}
