import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Promo from "@/models/Promo";

export async function GET() {
  await connectDB();

  const promo = await Promo.findOne({
    active: true,
  }).sort({
    createdAt: -1,
  });

  if (!promo) {
    return NextResponse.json({
      success: true,
      promo: null,
    });
  }

  if (promo.expiresAt.getTime() <= Date.now()) {
    promo.active = false;
    await promo.save();

    return NextResponse.json({
      success: true,
      promo: null,
    });
  }

  return NextResponse.json({
    success: true,
    promo,
  });
}