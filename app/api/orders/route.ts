import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";
import { UploadApiResponse } from "cloudinary";

// ================= GET =================
export async function GET() {
  try {
    await requireAdmin();

    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}