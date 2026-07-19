"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Order } from "./useOrders";

const roundCurrency = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export default function useAnalytics(orders: Order[]) {
  const [mounted] = useState(true);

  const currentTime = new Date();

  const greeting =
    currentTime.getHours() < 12
      ? "Good Morning ☀️"
      : currentTime.getHours() < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  // ======================
  // Orders
  // ======================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  // ======================
  // Revenue
  // ======================

  const totalRevenue = roundCurrency(
    orders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + Number(o.price ?? 0), 0)
  );

  const todayRevenue = roundCurrency(
    orders
      .filter((o) => {
        const orderDate = new Date(o.createdAt);
        const today = new Date();

        return (
          o.status === "Completed" &&
          orderDate.toDateString() === today.toDateString()
        );
      })
      .reduce((sum, o) => sum + Number(o.price ?? 0), 0)
  );

  const monthlyRevenue = roundCurrency(
    orders
      .filter((o) => {
        const orderDate = new Date(o.createdAt);
        const today = new Date();

        return (
          o.status === "Completed" &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, o) => sum + Number(o.price ?? 0), 0)
  );

  // ======================
  // Best Selling Game
  // ======================

  const bestSellingGame = useMemo(() => {

  const count: Record<string, number> = {};


  orders.forEach((o) => {

    const name = o.game
      .toLowerCase()
      .trim();


    let gameName = "";


    if (name.includes("pubg")) {
      gameName = "PUBG Mobile";
    }

    else if (
      name.includes("free") ||
      name.includes("fire") ||
      name === "ff"
    ) {
      gameName = "Free Fire";
    }

    else if (name.includes("roblox")) {
      gameName = "Roblox";
    }

    else if (
      name.includes("legend") ||
      name.includes("mlbb") ||
      name.includes("mobile legend")
    ) {
      gameName = "Mobile Legends";
    }


    if (gameName) {
      count[gameName] =
        (count[gameName] || 0) + 1;
    }

  });


  return (
    Object.entries(count)
      .sort((a,b)=>b[1]-a[1])[0]
    ||
    [
      "No Game",
      0
    ]
  );


}, [orders]);

  // ======================
  // Most Used Payment
  // ======================

  const mostUsedPayment = useMemo(() => {
    const count: Record<string, number> = {};

    orders
.filter((o) => o.status === "Completed")
.forEach((o) => {
      if (!o.payment) return;

      count[o.payment] = (count[o.payment] || 0) + 1;
    });

    return (
      Object.entries(count).sort((a, b) => b[1] - a[1])[0] || [
        "None",
        0,
      ]
    );
  }, [orders]);

  const paymentPercentage =
    totalOrders === 0
      ? 0
      : Math.round(
          (Number(mostUsedPayment[1]) / totalOrders) * 100
        );

  // ======================
  // Top Customer
  // ======================

  const topCustomer = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      count[o.playerName] =
        (count[o.playerName] || 0) + 1;
    });

    return (
      Object.entries(count).sort((a, b) => b[1] - a[1])[0] || [
        "No Customer",
        0,
      ]
    );
  }, [orders]);

  // ======================
  // Export Excel
  // ======================

  const exportExcel = () => {
    const data = orders.map((o) => ({
      Player: o.playerName,
      Game: o.game,
      Package: o.package,
      Price: roundCurrency(Number(o.price ?? 0)),
      Payment: o.payment,
      Status: o.status,
      Date: new Date(o.createdAt).toLocaleString(),
    }));

    const sheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      sheet,
      "Orders"
    );

    XLSX.writeFile(workbook, "orders.xlsx");
  };

  return {
    mounted,
    greeting,
    currentTime,

    totalOrders,
    pendingOrders,
    completedOrders,

    totalRevenue,
    todayRevenue,
    monthlyRevenue,

    bestSellingGame,
    mostUsedPayment,
    paymentPercentage,

    topCustomer,

    exportExcel,
  };
}