import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/lib/constants";
import { verifyToken } from "@/lib/jwt";

const guestOnlyRoutes = ["/login", "/register"];
const userRoutes = ["/dashboard", "/booking"];
const adminRoutes = ["/admin"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const session = verifyToken(token);
  const { pathname } = request.nextUrl;

  const isGuestOnly = guestOnlyRoutes.some((route) => pathname.startsWith(route));
  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isGuestOnly && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isUserRoute && !session) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`, request.url));
  }

  if (isAdminRoute && (!session || session.role !== "admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/booking/:path*", "/admin/:path*"],
};
