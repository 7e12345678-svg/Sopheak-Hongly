import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/models/Game";

// =========================
// Update Package
// =========================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    await connectDB();

    const { gameId } = await params;

    const { packageIndex, name, price } = await req.json();

    const game = await Game.findById(gameId);

    if (!game) {
      return NextResponse.json(
        {
          success: false,
          message: "Game not found",
        },
        { status: 404 }
      );
    }

    game.packages[packageIndex] = {
      name,
      price,
    };

    await game.save();

    return NextResponse.json({
      success: true,
      game,
    });
  } catch (error) {
    console.error(error);

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
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    await connectDB();

    const { gameId } = await params;

    const { searchParams } = new URL(req.url);

    const packageIndex = Number(
      searchParams.get("index")
    );

    const game = await Game.findById(gameId);

    if (!game) {
      return NextResponse.json(
        {
          success: false,
          message: "Game not found",
        },
        { status: 404 }
      );
    }

    game.packages.splice(packageIndex, 1);

    await game.save();

    return NextResponse.json({
      success: true,
      game,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      { status: 500 }
    );
  }
}