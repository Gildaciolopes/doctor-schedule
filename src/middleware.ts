import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // Evita redirecionamento em loop na página de autenticação
  if (!sessionCookie && request.nextUrl.pathname !== "/authentication") {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard",
    "/patients",
    "/doctors",
    "/appointments",
    "/subscription",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|authentication).*)",
  ],
};
