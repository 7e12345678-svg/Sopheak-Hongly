import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/models/Game";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await params;
    const { featured } = await req.json();

    const game = await Game.findByIdAndUpdate(
      id,
      { featured },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      game,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update featured",
      },
      {
        status: 500,
      }
    );
  }
}