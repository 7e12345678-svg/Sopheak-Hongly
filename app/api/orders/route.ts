import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";



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
  } catch (error) {
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

    const formData = await req.formData();

    const game = formData.get("game") as string;
    const gameId = formData.get("gameId") as string;
    const playerName = formData.get("playerName") as string;
    const serverId = formData.get("serverId") as string;
    const packageName = formData.get("package") as string;
    const payment = formData.get("payment") as string;
    const phone = formData.get("phone") as string;
    const price = Number(formData.get("price"));

    let screenshotUrl = "";

    const screenshot = formData.get("screenshot") as File | null;

    if (screenshot && screenshot.size > 0) {
      const bytes = await screenshot.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "game-topup",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      screenshotUrl = result.secure_url;
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
  screenshot: screenshotUrl,
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
      { status: 500 }
    );
  }
}

// ================= PATCH =================
// ================= PATCH =================
export async function PATCH(req: Request) {
  try {
    await requireAdmin();

    await connectDB();

    const { id, status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
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

// ================= DELETE =================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    await connectDB();

    const { id } = await params;

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
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