import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/models/Game";

// =========================
// Get Packages API
// =========================
export async function GET() {
  try {
    await connectDB();

    const games = await Game.find(
      { status: true },
      {
        name: 1,
        slug: 1,
        image: 1,
        packages: 1,
      }
    ).lean();

    const packages = games.flatMap((game: any) =>
      (game.packages || []).map((pkg: any) => ({
        _id: pkg._id,
        gameId: game._id,
        gameName: game.name,
        gameSlug: game.slug,
        gameImage: game.image,
        name: pkg.name,
        price: pkg.price,
      }))
    );

    return NextResponse.json({
      success: true,
      packages,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch packages",
      },
      {
        status: 500,
      }
    );
  }
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