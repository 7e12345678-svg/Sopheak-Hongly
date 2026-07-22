import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const store = await cookies();

  return NextResponse.json({
    cookies: store.getAll(),
  });
}