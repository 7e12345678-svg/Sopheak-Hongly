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

function normalizeGameName(game: string) {
  const value = game.trim().toLowerCase();

  if (
    value.includes("mobile") ||
    value.includes("legend") ||
    value === "ml" ||
    value === "mlbb"
  ) {
    return "Mobile Legends";
  }

  if (value.includes("pubg")) {
    return "PUBG Mobile";
  }

  if (
    value.includes("free") ||
    value === "ff"
  ) {
    return "Free Fire";
  }

  if (value.includes("roblox")) {
    return "Roblox";
  }

  return "";
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

    const totalCustomers = new Set(
      orders.map((order) => order.phone)
    ).size;

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
      const payment = order.payment?.trim();

      if (
        payment &&
        payment in paymentMethods
      ) {
        paymentMethods[
          payment as keyof typeof paymentMethods
        ]++;
      }
    });

   // ===========================
// Top Games (Only 4 Games)
// ===========================

const gameMap = {
  "Mobile Legends": 0,
  "PUBG Mobile": 0,
  "Free Fire": 0,
  "Roblox": 0,
};

orders.forEach((order) => {
  const game = normalizeGameName(order.game);

  if (game in gameMap) {
    gameMap[game as keyof typeof gameMap]++;
  }
});

const topGames = [
  {
    name: "Mobile Legends",
    orders: gameMap["Mobile Legends"],
  },
  {
    name: "PUBG Mobile",
    orders: gameMap["PUBG Mobile"],
  },
  {
    name: "Free Fire",
    orders: gameMap["Free Fire"],
  },
  {
    name: "Roblox",
    orders: gameMap["Roblox"],
  },
];
    // ===========================
    // Monthly Revenue / Orders
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

    const monthlyRevenue = monthNames.map((month) => ({
      month,
      revenue: 0,
    }));

    const monthlyOrders = monthNames.map((month) => ({
      month,
      orders: 0,
    }));

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