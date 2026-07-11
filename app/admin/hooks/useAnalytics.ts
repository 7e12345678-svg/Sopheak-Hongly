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

  // =========================
  // Orders
  // =========================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  // =========================
  // Revenue
  // =========================

  const getPrice = (pkg: string) => {
    const price = parseFloat(
      pkg.replace(/[^\d.]/g, "")
    );

    return isNaN(price) ? 0 : price;
  };

  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + getPrice(o.package), 0);

  const today = new Date().toDateString();

  const todayRevenue = orders
    .filter(
      (o) =>
        o.status === "Completed" &&
        new Date(o.createdAt).toDateString() === today
    )
    .reduce((sum, o) => sum + getPrice(o.package), 0);

  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();

  const monthlyRevenue = orders
    .filter((o) => {
      const d = new Date(o.createdAt);

      return (
        o.status === "Completed" &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    })
    .reduce((sum, o) => sum + getPrice(o.package), 0);

  // =========================
  // Best Game
  // =========================

  const bestSellingGame = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      count[o.game] = (count[o.game] || 0) + 1;
    });

    return (
      Object.entries(count).sort(
        (a, b) => b[1] - a[1]
      )[0] || ["No Game", 0]
    );
  }, [orders]);

  // =========================
  // Payment
  // =========================

  const mostUsedPayment = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      count[o.payment] =
        (count[o.payment] || 0) + 1;
    });

    return (
      Object.entries(count).sort(
        (a, b) => b[1] - a[1]
      )[0] || ["None", 0]
    );
  }, [orders]);

  const paymentPercentage =
    totalOrders === 0
      ? 0
      : Math.round(
          (Number(mostUsedPayment[1]) /
            totalOrders) *
            100
        );

  // =========================
  // Top Customer
  // =========================

  const topCustomer = useMemo(() => {
    const count: Record<string, number> = {};

    orders.forEach((o) => {
      count[o.playerName] =
        (count[o.playerName] || 0) + 1;
    });

    return (
      Object.entries(count).sort(
        (a, b) => b[1] - a[1]
      )[0] || ["No Customer", 0]
    );
  }, [orders]);

  // =========================
  // Export Excel
  // =========================

  const exportExcel = () => {
    const sheet =
      XLSX.utils.json_to_sheet(orders);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      sheet,
      "Orders"
    );

    XLSX.writeFile(
      workbook,
      "orders.xlsx"
    );
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