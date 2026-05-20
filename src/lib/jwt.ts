import { createHmac, timingSafeEqual } from "node:crypto";

import { env } from "@/lib/env";
import type { SessionUser } from "@/types";

interface JwtPayload extends SessionUser {
  exp: number;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
}

function signValue(value: string) {
  return createHmac("sha256", env.jwtSecret).update(value).digest("base64url");
}

export function signToken(user: SessionUser) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      ...user,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    } satisfies JwtPayload),
  );

  const signature = signValue(`${header}.${payload}`);

  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  const expected = signValue(`${header}.${payload}`);

  try {
    const valid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!valid) {
      return null;
    }

    const decoded = JSON.parse(base64UrlDecode(payload)) as JwtPayload;

    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
