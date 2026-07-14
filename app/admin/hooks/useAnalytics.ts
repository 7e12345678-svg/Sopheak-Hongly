"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Order } from "./useOrders";

export default function useAnalytics(orders: Order[]) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Greeting
  const hour = currentTime.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  // Orders
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  // Revenue
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + Number(o.price), 0);
  }, [orders]);

  const todayRevenue = useMemo(() => {
    const today = new Date().toDateString();

    return orders
      .filter(
        (o) =>
          o.status === "Completed" &&
          new Date(o.createdAt).toDateString() === today
      )
      .reduce((sum, o) => sum + Number(o.price), 0);
  }, [orders]);

  const monthlyRevenue = useMemo(() => {
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();

    return orders
      .filter((o) => {
        const d = new Date(o.createdAt);

        return (
          o.status === "Completed" &&
          d.getMonth() === month &&
          d.getFullYear() === year
        );
      })
      .reduce((sum, o) => sum + Number(o.price), 0);
  }, [orders, currentTime]);

  // Best Selling Game
  const bestSellingGame = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      count[o.game] = (count[o.game] || 0) + 1;
    });

    const result = Object.entries(count).sort(
      (a, b) => b[1] - a[1]
    );

    return result[0] ?? ["No Game", 0];
  }, [orders]);

  // Most Used Payment
  const mostUsedPayment = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      if (!o.payment) return;

      count[o.payment] = (count[o.payment] || 0) + 1;
    });

    const result = Object.entries(count).sort(
      (a, b) => b[1] - a[1]
    );

    return result[0] ?? ["None", 0];
  }, [orders]);

  const paymentPercentage =
    totalOrders === 0
      ? 0
      : Math.round(
          (Number(mostUsedPayment[1]) / totalOrders) * 100
        );

  // Top Customer
  const topCustomer = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      count[o.playerName] =
        (count[o.playerName] || 0) + 1;
    });

    const result = Object.entries(count).sort(
      (a, b) => b[1] - a[1]
    );

    return result[0] ?? ["No Customer", 0];
  }, [orders]);

  // Export Excel
  const exportExcel = () => {
    const exportData = orders.map((o) => ({
      Player: o.playerName,
      Game: o.game,
      Package: o.package,
      Price: o.price,
      Payment: o.payment,
      Status: o.status,
      Date: new Date(o.createdAt).toLocaleString(),
    }));

    const sheet = XLSX.utils.json_to_sheet(exportData);

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
    currentTime,
    greeting,

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