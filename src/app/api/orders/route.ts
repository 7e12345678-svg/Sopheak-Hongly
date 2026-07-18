import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";
import { UploadApiResponse } from "cloudinary";

// =========================
// GET ALL ORDERS (Admin Only)
// =========================
export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET Orders Error:", error);

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

// =========================
// CREATE ORDER
// =========================
export async function POST(req: Request) {
  try {
    await connectDB();

    const form = await req.formData();

    const game = String(form.get("game") || "").trim();
    const gameId = String(form.get("gameId") || "").trim();
    const playerName = String(form.get("playerName") || "").trim();
    const serverId = String(form.get("serverId") || "").trim();
    const packageName = String(form.get("package") || "").trim();
    const price = Number(form.get("price") || 0);
    const payment = String(form.get("payment") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    // =========================
    // Validation
    // =========================
    if (
      !game ||
      !gameId ||
      !playerName ||
      !packageName ||
      !payment ||
      !phone ||
      price <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // Upload Screenshot
    // =========================
    let screenshot = "";

    const file = form.get("screenshot") as File | null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "orders",
            },
            (error, result) => {
              if (error || !result) {
                return reject(error);
              }

              resolve(result);
            }
          );

          stream.end(buffer);
        }
      );

      screenshot = upload.secure_url;
    }

    // =========================
    // Generate Tracking Code
    // =========================
    const trackingCode =
      "GT" +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");

    // =========================
    // Save Order
    // =========================
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

      trackingCode,

      status: "Pending",
    });

    return NextResponse.json({
      success: true,
      message: "Order created successfully.",
      trackingCode: order.trackingCode,
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order.",
      },
      {
        status: 500,
      }
    );
  }
}