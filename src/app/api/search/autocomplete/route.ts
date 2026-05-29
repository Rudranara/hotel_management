import { NextRequest } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Room from "@/models/Room";
import { isDatabaseConfigured } from "@/lib/env";
import { rateLimit } from "@/lib/rate-limit";
import { LOCATIONS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Levenshtein distance (pure TS, no deps)
// ---------------------------------------------------------------------------
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]!
          : 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
    }
  }
  return dp[m]![n]!;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const POPULAR = [
  { label: "Puri, Odisha",         sublabel: "Beach · Jagannath Temple · Pilgrimage" },
  { label: "Bhubaneswar, Odisha",  sublabel: "Capital City · Temples · Culture"      },
  { label: "Konark, Odisha",       sublabel: "Sun Temple · UNESCO Heritage · Art"    },
  { label: "Chilika Lake, Odisha", sublabel: "Lake · Flamingos · Boat Safari"        },
  { label: "Gopalpur, Odisha",     sublabel: "Quiet Beach · Getaway · Sea Breeze"    },
];

const CORRECTIONS: Record<string, string> = {
  bhubaneshwar:    "Bhubaneswar, Odisha",
  bhubneswar:      "Bhubaneswar, Odisha",
  bhubenswar:      "Bhubaneswar, Odisha",
  bhubneshwar:     "Bhubaneswar, Odisha",
  bubhaneswar:     "Bhubaneswar, Odisha",
  purri:           "Puri, Odisha",
  pury:            "Puri, Odisha",
  konarak:         "Konark, Odisha",
  konarka:         "Konark, Odisha",
  konarkk:         "Konark, Odisha",
  chilka:          "Chilika Lake, Odisha",
  chilica:         "Chilika Lake, Odisha",
  "chillka lake":  "Chilika Lake, Odisha",
  gopalapur:       "Gopalpur, Odisha",
  "gopalpur on sea": "Gopalpur, Odisha",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AutocompleteDestination = { label: string; sublabel: string; roomCount?: number };
export type AutocompleteRoom = {
  label: string;
  sublabel: string;
  slug: string;
  price: number;
  image?: string;
};
export type AutocompleteResponse = {
  destinations: AutocompleteDestination[];
  rooms: AutocompleteRoom[];
  didYouMean: string | null;
  query: string;
};

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!rateLimit(`autocomplete:${ip}`, 30, 10_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 100);

  // Empty query → return popular destinations with room counts
  if (!q) {
    let popularWithCounts: AutocompleteDestination[] = POPULAR;
    if (isDatabaseConfigured()) {
      try {
        await connectToDatabase();
        const counts = await Promise.all(
          POPULAR.map((p) =>
            (Room as { countDocuments: (f: unknown) => Promise<number> }).countDocuments({
              location: { $regex: p.label.split(",")[0]!, $options: "i" },
              availabilityStatus: { $ne: "unavailable" },
            }),
          ),
        );
        popularWithCounts = POPULAR.map((p, i) => ({ ...p, roomCount: counts[i] }));
      } catch { /* ignore */ }
    }
    return Response.json({
      destinations: popularWithCounts,
      rooms: [],
      didYouMean: null,
      query: "",
    } as AutocompleteResponse);
  }

  const qLower = q.toLowerCase();

  // Direct misspelling correction
  let didYouMean: string | null = CORRECTIONS[qLower] ?? null;

  // Score all known destinations
  const allLabels = [...new Set([...POPULAR.map((p) => p.label), ...(LOCATIONS as readonly string[])])];

  type ScoredDest = AutocompleteDestination & { score: number };
  const scored: ScoredDest[] = allLabels.map((label) => {
    const ll = label.toLowerCase();
    let score = 0;

    if (ll === qLower)                  score = 100;
    else if (ll.startsWith(qLower))     score = 85;
    else if (ll.includes(qLower))       score = 65;
    else {
      // Word-level fuzzy match
      const destWords  = ll.split(/[\s,]+/).filter((w) => w.length >= 3);
      const queryWords = qLower.split(/[\s,]+/).filter((w) => w.length >= 3);

      let best = 0;
      for (const qw of queryWords) {
        for (const dw of destWords) {
          const maxLen    = Math.max(qw.length, dw.length);
          const threshold = maxLen >= 8 ? 2 : maxLen >= 5 ? 1 : 0;
          const dist      = levenshtein(qw, dw);
          if (dist <= threshold) {
            const ws = 40 - dist * 8;
            if (ws > best) {
              best = ws;
              if (!didYouMean) didYouMean = label;
            }
          }
        }
      }
      score = best;
    }

    const pop = POPULAR.find((p) => p.label === label);
    return { label, sublabel: pop?.sublabel ?? "Destination in Odisha", score };
  });

  const destinations = scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ label, sublabel }) => ({ label, sublabel }));

  // DB room search (graceful no-op when DB not configured)
  let rooms: AutocompleteRoom[] = [];
  if (isDatabaseConfigured()) {
    try {
      await connectToDatabase();
      const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Fetch room results + per-destination counts in parallel
      const [dbRooms, destCounts] = await Promise.all([
        (Room as {
          find: (filter: unknown) => {
            select: (fields: string) => {
              limit: (n: number) => { lean: () => Promise<Array<{ name: string; slug: string; location: string; price: number; images: string[] }>> }
            }
          }
        }).find({
          $or: [
            { name:     { $regex: safeQ, $options: "i" } },
            { location: { $regex: safeQ, $options: "i" } },
          ],
          availabilityStatus: { $ne: "unavailable" },
        })
          .select("name slug location price images")
          .limit(4)
          .lean(),
        Promise.all(
          destinations.map((d) =>
            (Room as { countDocuments: (f: unknown) => Promise<number> }).countDocuments({
              location: { $regex: d.label.split(",")[0]!, $options: "i" },
              availabilityStatus: { $ne: "unavailable" },
            }).catch(() => undefined as number | undefined),
          ),
        ),
      ]);

      // Attach room counts to destinations
      destinations.forEach((d, i) => {
        (d as AutocompleteDestination).roomCount = destCounts[i];
      });

      rooms = dbRooms.map((r) => ({
        label:    r.name,
        sublabel: `${r.location} · ₹${r.price.toLocaleString("en-IN")}/night`,
        slug:     r.slug,
        price:    r.price,
        image:    r.images[0],
      }));
    } catch {
      // DB error — return gracefully without room results
    }
  }

  // Only emit didYouMean when there are no strong direct matches
  const hasMatches = destinations.length > 0 || rooms.length > 0;
  const finalDidYouMean =
    !hasMatches && didYouMean && didYouMean.toLowerCase() !== qLower
      ? didYouMean
      : null;

  return Response.json({
    destinations,
    rooms,
    didYouMean: finalDidYouMean,
    query: q,
  } as AutocompleteResponse);
}
