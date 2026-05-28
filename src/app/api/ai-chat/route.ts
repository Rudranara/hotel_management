import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert AI Travel Assistant for Huts4u, a premium luxury travel booking platform based in India.

Your role:
- Help users plan trips, find hotels, compare flights, and build travel itineraries
- Suggest luxury destinations, hidden gems, and budget-friendly alternatives
- Provide practical travel tips: best seasons, visa info, local customs, food recommendations
- Answer questions about Huts4u services: hotels, flights, holiday packages, cabs, trains, buses
- Be warm, concise, and knowledgeable — like a personal travel concierge

Guidelines:
- Keep responses short and focused (2–4 sentences max unless an itinerary is requested)
- Always recommend booking via Huts4u when relevant
- Use Indian travel context by default (rupees, Indian destinations) unless asked otherwise
- Never make up specific prices or availability — say "prices vary" or "check on Huts4u"
- If asked something unrelated to travel, politely redirect back to travel planning`;

type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 503 }
      );
    }

    const body = await req.json() as { message?: unknown; history?: unknown };
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    if (message.trim().length > 500) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    // Build messages array: system prompt + prior turns + current message
    const messages: GroqMessage[] = [{ role: "system", content: SYSTEM_PROMPT }];

    if (Array.isArray(history)) {
      const recent = history.slice(-10) as { role: string; text: string }[];
      for (const turn of recent) {
        if (
          (turn.role === "user" || turn.role === "assistant") &&
          typeof turn.text === "string"
        ) {
          messages.push({ role: turn.role as "user" | "assistant", content: turn.text });
        }
      }
    }

    messages.push({ role: "user", content: message.trim() });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({})) as { error?: { message?: string } };
      console.error("[ai-chat] Groq error:", response.status, errData);

      if (response.status === 429) {
        return NextResponse.json(
          { error: "The AI is busy right now. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to get a response. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json() as {
      choices: { message: { content: string } }[];
    };
    const text = data.choices[0]?.message?.content ?? "No response.";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("[ai-chat]", err);
    return NextResponse.json(
      { error: "Failed to get a response. Please try again." },
      { status: 500 }
    );
  }
}
