import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                    request.nextUrl.pathname.startsWith("/register") ||
                    request.nextUrl.pathname.startsWith("/forgot-password");
  const isPublicPage = request.nextUrl.pathname === "/";

  // Se não estiver em uma página pública e não tiver token, redireciona para login
  if (!authToken && !isAuthPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tiver token e tentar acessar página de auth, redireciona para dashboard
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configurar quais caminhos o middleware deve ser executado
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}; 