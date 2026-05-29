import { NextRequest } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { ROOM_TYPES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ParsedFilters = {
  destination?: string;
  type?: string;
  maxPrice?: number;
  minGuests?: number;
  query?: string;
};

type AiParseResponse = {
  filters: ParsedFilters;
  query: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sanitizeFilters(raw: Record<string, unknown>): ParsedFilters {
  const out: ParsedFilters = {};

  if (typeof raw.destination === "string" && raw.destination.trim()) {
    out.destination = raw.destination.trim().slice(0, 100);
  }

  if (typeof raw.type === "string" && (ROOM_TYPES as readonly string[]).includes(raw.type)) {
    out.type = raw.type;
  }

  if (typeof raw.maxPrice === "number" && raw.maxPrice > 0) {
    out.maxPrice = Math.min(Math.round(raw.maxPrice), 500_000);
  }

  if (typeof raw.minGuests === "number" && raw.minGuests > 0) {
    out.minGuests = Math.min(Math.round(raw.minGuests), 20);
  }

  if (typeof raw.query === "string" && raw.query.trim()) {
    out.query = raw.query.trim().slice(0, 100);
  }

  return out;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "AI search is not configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!rateLimit(`ai-parse:${ip}`, 5, 60_000)) {
    return Response.json({ error: "Too many requests — please wait a moment" }, { status: 429 });
  }

  let body: { query?: unknown };
  try {
    body = (await req.json()) as { query?: unknown };
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body.query !== "string" || !body.query.trim()) {
    return Response.json({ error: "query is required" }, { status: 400 });
  }

  const userQuery = body.query.trim().slice(0, 200);

  const systemPrompt = `You are a hotel search assistant for Huts4u, a hotel platform in Odisha, India.
Extract structured filters from the user's natural language search query.

Known destinations: Puri, Bhubaneswar, Konark, Chilika Lake, Gopalpur (all in Odisha).
Known room types: ${(ROOM_TYPES as readonly string[]).join(", ")}.
Prices are in Indian Rupees (₹). Budget ≈ ₹5,000–₹12,000/night. Luxury ≈ ₹20,000+/night.

Return ONLY this JSON object (no markdown, no explanation):
{
  "destination": "<city name or null>",
  "type": "<one of: ${(ROOM_TYPES as readonly string[]).join(" | ")} or null>",
  "maxPrice": <number or null>,
  "minGuests": <number or null>,
  "query": "<cleaned search keywords, removing location/price/type info, or null>"
}`;

  let rawText = "";
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:       "llama-3.1-8b-instant",
        temperature: 0,
        max_tokens:  200,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userQuery },
        ],
      }),
    });

    if (!groqRes.ok) {
      return Response.json({ error: "AI service unavailable" }, { status: 502 });
    }

    const groqData = (await groqRes.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    rawText = groqData.choices?.[0]?.message?.content ?? "";
  } catch {
    return Response.json({ error: "AI service unavailable" }, { status: 502 });
  }

  // Parse JSON — strip any accidental markdown fences
  let rawFilters: Record<string, unknown>;
  try {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    rawFilters = JSON.parse(cleaned) as Record<string, unknown>;
  } catch {
    // Couldn't parse AI output — return empty filters
    rawFilters = {};
  }

  const filters = sanitizeFilters(rawFilters);

  return Response.json({ filters, query: userQuery } as AiParseResponse);
}
