import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ trackingCode: string }> }
) {
  try {
    await connectDB();

    const { trackingCode } = await params;

    const order = await Order.findOne({
      trackingCode: trackingCode.toUpperCase(),
    }).lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("TRACK ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order.",
      },
      {
        status: 500,
      }
    );
  }
}