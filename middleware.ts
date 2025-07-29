import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = await getSessionCookie(request);
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/backoffice/:path*",
    "/feedback/:path*",
    "/support/:path*",
    "/library/:path*",
    "/requests/:path*",
    "/",
  ],
};
