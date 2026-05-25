/**
 * Simple in-memory rate limiter.
 * Resets per window. Good enough for a single-instance deployment.
 * For multi-instance / production, swap the map with Redis (e.g. Upstash).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Returns true if the request is allowed; false if it should be blocked.
 *
 * @param key        Unique identifier (IP + endpoint)
 * @param limit      Max requests per window
 * @param windowMs   Window size in milliseconds (default 60 s)
 */
export function rateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Prune stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60_000);
