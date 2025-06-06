import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // Se não houver sessão e a rota NÃO for /authentication, redireciona para a tela de login
  if (!sessionCookie && request.nextUrl.pathname !== "/authentication") {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rotas protegidas (só acessíveis com sessão válida)
    "/dashboard",
    "/patients",
    "/doctors",
    "/appointments",
    "/subscription",
    "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|authentication).*)",
  ],
};
