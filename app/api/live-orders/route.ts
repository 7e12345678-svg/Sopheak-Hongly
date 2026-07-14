import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find(
      {},
      {
        playerName: 1,
        game: 1,
        package: 1,
        status: 1,
        createdAt: 1,
      }
    )
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}