import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Promo from "@/models/Promo";

export async function POST(req: Request) {
  await connectDB();

  const { code } = await req.json();

  const promo = await Promo.findOne({
    code: code.toUpperCase(),
    active: true,
  });

  if (!promo) {
    return NextResponse.json({
      success: false,
      message: "Invalid Promo Code",
    });
  }

  if (
    promo.expiresAt &&
    promo.expiresAt < new Date()
  ) {
    return NextResponse.json({
      success: false,
      message: "Promo Expired",
    });
  }

  return NextResponse.json({
    success: true,
    discount: promo.discount,
  });
}