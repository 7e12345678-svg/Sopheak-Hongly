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

    const orders = await Order.find().sort({
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
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
// ================= POST =================
export async function POST(req: Request) {
  try {
    await connectDB();

    const form = await req.formData();

    const game = String(form.get("game") || "");
    const gameId = String(form.get("gameId") || "");
    const playerName = String(form.get("playerName") || "");
    const serverId = String(form.get("serverId") || "");
    const packageName = String(form.get("package") || "");
    const price = Number(form.get("price") || 0);
    const payment = String(form.get("payment") || "");
    const phone = String(form.get("phone") || "");

    let screenshot = "";

    const file = form.get("screenshot") as File | null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "orders",
              },
              (error, result) => {
                if (error || !result) {
                  return reject(error);
                }

                resolve(result);
              }
            )
            .end(buffer);
        }
      );

      screenshot = upload.secure_url;
    }

    const order = await Order.create({
      game,
      gameId,
      playerName,
      serverId,
      package: packageName,
      price,
      payment,
      phone,
      screenshot,
      status: "Pending",
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}