"use client";

import { useCallback, useEffect, useState } from "react";

import RevenueChart from "@/components/analytics/RevenueChart";
import OrdersChart from "@/components/analytics/OrdersChart";
import PaymentChart from "@/components/analytics/PaymentChart";
import TopGames from "@/components/analytics/TopGames";
import StatsCards from "@/components/analytics/StatsCards";
import RecentOrders from "@/components/analytics/RecentOrders";

import type { Analytics, Order } from "@/types";

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] =
useState<Analytics | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();

      if (data.success) {
        setAnalytics(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchAnalytics();
  }, [fetchOrders, fetchAnalytics]);

  if (!analytics) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b1d] text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b1d] p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold text-cyan-400">
        📊 Analytics Dashboard
      </h1>

      <StatsCards analytics={analytics} />

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
        <RevenueChart analytics={analytics} />
        <OrdersChart analytics={analytics} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
        <PaymentChart analytics={analytics} />
        <TopGames analytics={analytics} />
      </div>

      <div className="mt-8">
        <RecentOrders orders={orders} />
      </div>
    </main>
  );
}