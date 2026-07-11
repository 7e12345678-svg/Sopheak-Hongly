import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(
  request: Request,
  context: { params: Promise<{ phone: string }> }
) {
  try {
    await connectDB();

    const { phone } = await context.params;

    const orders = await Order.find({ phone }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.error(err);

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