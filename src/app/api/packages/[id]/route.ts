import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/models/Game";
import mongoose from "mongoose";

// =========================
// Update Package
// =========================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("========== UPDATE PACKAGE ==========");
    console.log("Received Game ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Game ID",
        },
        { status: 400 }
      );
    }

    const { index, name, price } = await req.json();

    const game = await Game.findById(id);

    if (!game) {
      return NextResponse.json(
        {
          success: false,
          message: "Game not found",
        },
        { status: 404 }
      );
    }

    if (
      index === undefined ||
      index < 0 ||
      index >= game.packages.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    game.packages[index].name = String(name).trim();
    game.packages[index].price = Number(price);

    await game.save();

    return NextResponse.json({
      success: true,
      message: "Package updated successfully",
      game,
    });
  } catch (error) {
    console.error("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      { status: 500 }
    );
  }
}

// =========================
// Delete Package
// =========================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("========== DELETE PACKAGE ==========");
    console.log("Received Game ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Game ID",
        },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const index = Number(searchParams.get("index"));

    const game = await Game.findById(id);

    if (!game) {
      return NextResponse.json(
        {
          success: false,
          message: "Game not found",
        },
        { status: 404 }
      );
    }

    if (
      Number.isNaN(index) ||
      index < 0 ||
      index >= game.packages.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    game.packages.splice(index, 1);

    await game.save();

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error: any) {
    console.error("========== DELETE ERROR ==========");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Delete failed",
      },
      { status: 500 }
    );
  }
}