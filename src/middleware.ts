import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Cookie name must match the one set in admin-login API
  const token = req.cookies.get("admin_token")?.value;

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};