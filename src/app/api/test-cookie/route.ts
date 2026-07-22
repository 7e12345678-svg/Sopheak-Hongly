import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({
    success: true,
  });

  res.cookies.set("test_cookie", "hello", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });

  return res;
}
