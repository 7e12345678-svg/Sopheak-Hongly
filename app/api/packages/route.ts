import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/models/Game";

// =========================
// Get Packages API
// =========================
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Packages API",
  });
}

// =========================
// Add Package
// =========================
export async function POST(req: Request) {
  try {
    await connectDB();

    const { gameId, name, price } = await req.json();

    const packageName = String(name).trim();
    const packagePrice = Number(price);

    if (!gameId || !packageName) {
      return NextResponse.json(
        {
          success: false,
          message: "Package name is required",
        },
        { status: 400 }
      );
    }

    if (isNaN(packagePrice) || packagePrice <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid package price",
        },
        { status: 400 }
      );
    }

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

    const exists = game.packages.some(
      (pkg: { name: string }) =>
        pkg.name.trim().toLowerCase() ===
        packageName.toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: `Package "${packageName}" already exists.`,
        },
        { status: 409 }
      );
    }

    game.packages.push({
      name: packageName,
      price: packagePrice,
    });

    await game.save();

    return NextResponse.json({
      success: true,
      message: "Package added successfully",
      game,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add package",
      },
      { status: 500 }
    );
  }
}