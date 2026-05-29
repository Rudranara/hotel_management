import { NextRequest } from "next/server";

import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { isDatabaseConfigured } from "@/lib/env";

// ---------------------------------------------------------------------------
// GET — return the last AI search for the logged-in user
// ---------------------------------------------------------------------------
export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ entry: null });
  }

  if (!isDatabaseConfigured()) {
    return Response.json({ entry: null });
  }

  try {
    await connectToDatabase();
    const user = await (User as {
      findById: (id: string) => {
        select: (fields: string) => {
          lean: () => Promise<{ aiSearchHistory?: Array<{ query: string; label: string; filters: Record<string, unknown>; createdAt: string }> } | null>
        }
      }
    }).findById(session.userId)
      .select("aiSearchHistory")
      .lean();

    const history = user?.aiSearchHistory ?? [];
    const last = history[history.length - 1] ?? null;
    return Response.json({ entry: last });
  } catch {
    return Response.json({ entry: null });
  }
}

// ---------------------------------------------------------------------------
// POST — push a new entry (max 10 kept via $slice)
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json({ success: false }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return Response.json({ success: false }, { status: 503 });
  }

  let body: { query?: unknown; label?: unknown; filters?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  if (
    typeof body.query !== "string" || !body.query.trim() ||
    typeof body.label !== "string" || !body.label.trim()
  ) {
    return Response.json({ success: false }, { status: 400 });
  }

  const entry = {
    query:     body.query.trim().slice(0, 200),
    label:     body.label.trim().slice(0, 300),
    filters:   typeof body.filters === "object" && body.filters !== null ? body.filters : {},
    createdAt: new Date(),
  };

  try {
    await connectToDatabase();
    await (User as {
      findByIdAndUpdate: (id: string, update: unknown) => Promise<unknown>
    }).findByIdAndUpdate(session.userId, {
      $push: {
        aiSearchHistory: {
          $each:  [entry],
          $slice: -10,           // keep only the newest 10
        },
      },
    });
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
}
