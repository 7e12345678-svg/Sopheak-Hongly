import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({
      status: "Completed",
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const data = orders.map((order: any) => ({
  id: order._id.toString(),
  name: order.playerName,
  game: order.game,
  item: order.package,
  avatar: "/images/default-avatar.png",
  time: new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(order.createdAt)),
}));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Notification API:", error);

    return NextResponse.json([], {
      status: 500,
    });
  }
}