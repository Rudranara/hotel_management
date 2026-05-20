import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/lib/constants";
import { signToken, verifyToken } from "@/lib/jwt";
import type { SessionUser } from "@/types";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  return verifyToken(token);
}

export async function setSessionCookie(user: SessionUser) {
  const cookieStore = await cookies();
  const token = signToken(user);

  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}
