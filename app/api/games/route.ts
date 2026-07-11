import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Game from "@/models/Game";
import { requireAdmin } from "@/lib/auth";

// ================= GET =================
export async function GET() {
  try {
    await connectDB();

    const games = await Game.find().sort({
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

// ================= POST =================
export async function POST(req: Request) {
  try {
    await requireAdmin();

    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    if (!name || !slug || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        {
          status: 400,
        }
      );
    }

    // Upload Image to Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "games",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Save Game
    const game = await Game.create({
      name,
      slug,
      description,
      image: result.secure_url,
      status: true,
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