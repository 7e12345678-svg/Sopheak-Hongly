import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    const customerMap = new Map();

    orders.forEach((order: any) => {
      const key = order.phone;

      if (!customerMap.has(key)) {
        customerMap.set(key, {
          phone: order.phone,
          playerName: order.playerName,
          totalOrders: 1,
          totalSpent: Number(order.price || 0),
          favoriteGame: order.game,
          lastOrder: order.createdAt,
        });
      } else {
        const customer = customerMap.get(key);

        customer.totalOrders += 1;
        customer.totalSpent += Number(order.price || 0);
        customer.lastOrder = order.createdAt;
      }
    });

    return NextResponse.json({
      success: true,
      customers: [...customerMap.values()],
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}