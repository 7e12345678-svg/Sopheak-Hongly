import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Game from "@/models/Game";

interface AnalyticsOrder {
  phone: string;
  status: string;
  payment: string;
  game: string;
  price?: number;
  createdAt: Date | string;
}

export async function GET() {
  try {
    await connectDB();

    const orders = (await Order.find()) as AnalyticsOrder[];
    const games = await Game.find();

    // ===========================
    // Dashboard Stats
    // ===========================

    const totalOrders = orders.length;

    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    ).length;

    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;

    const totalGames = games.length;

    // ===========================
    // Customers
    // ===========================

    const uniqueCustomers = new Set(
      orders.map((order) => order.phone)
    );

    const totalCustomers = uniqueCustomers.size;

    // ===========================
    // Revenue
    // ===========================

    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.price ?? 0),
      0
    );

    // ===========================
    // Payment Methods
    // ===========================

    const paymentMethods = {
      ABA: 0,
      ACLEDA: 0,
      Wing: 0,
      AMK: 0,
    };

    orders.forEach((order) => {
      const method =
        order.payment as keyof typeof paymentMethods;

      if (method in paymentMethods) {
        paymentMethods[method]++;
      }
    });

    // ===========================
    // Top Games
    // ===========================

    const gameMap: Record<string, number> = {};

    orders.forEach((order) => {
      gameMap[order.game] =
        (gameMap[order.game] || 0) + 1;
    });

    const topGames = Object.entries(gameMap)
      .map(([name, count]) => ({
        name,
        orders: count,
      }))
      .sort((a, b) => b.orders - a.orders);

    // ===========================
    // Monthly Revenue
    // ===========================

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = monthNames.map(
      (month) => ({
        month,
        revenue: 0,
      })
    );

    const monthlyOrders = monthNames.map(
      (month) => ({
        month,
        orders: 0,
      })
    );

    orders.forEach((order) => {
      const month = new Date(
        order.createdAt
      ).getMonth();

      monthlyRevenue[month].revenue += Number(
        order.price ?? 0
      );

      monthlyOrders[month].orders++;
    });

    return NextResponse.json({
      success: true,

      stats: {
        revenue,
        totalOrders,
        completedOrders,
        pendingOrders,
        totalGames,
        totalCustomers,
      },

      paymentMethods,
      topGames,
      monthlyRevenue,
      monthlyOrders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Analytics failed",
      },
      {
        status: 500,
      }
    );
  }
}