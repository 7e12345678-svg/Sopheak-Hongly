import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Game from "@/models/Game";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "games",
          localField: "game",
          foreignField: "name",
          as: "gameInfo",
        },
      },
      {
        $unwind: {
          path: "$gameInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          playerName: 1,
          game: 1,
          package: 1,
          status: 1,
          createdAt: 1,
          image: "$gameInfo.image",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch live orders",
      },
      {
        status: 500,
      }
    );
  }
}