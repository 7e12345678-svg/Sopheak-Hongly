import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/models/Game";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";

// =========================
// GET All Games
// =========================

export async function GET() {
  try {
    await connectDB();

    const games = await Game.find().sort({
  featured: -1,
  sortOrder: 1,
  createdAt: -1,
});

    return NextResponse.json({
      success: true,
      games,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch games",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// Create Game
// =========================

export async function POST(req: Request) {
  try {
    await requireAdmin();

    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;

    const slug = formData.get("slug") as string;

    const description =
      (formData.get("description") as string) || "";

    const featured =
      formData.get("featured") === "true";

    const sortOrder = Number(
      formData.get("sortOrder") || 0
    );

    const status =
      formData.get("status") !== "false";

    const image = formData.get("image") as File;

    let imageUrl = "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const result: any = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "game-topup/games",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        }
      );

      imageUrl = result.secure_url;
    }

    const game = await Game.create({
      name,
      slug,
      image: imageUrl,
      description,
      featured,
      sortOrder,
      status,
      packages: [],
    });

    return NextResponse.json({
      success: true,
      game,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create game",
      },
      {
        status: 500,
      }
    );
  }
}