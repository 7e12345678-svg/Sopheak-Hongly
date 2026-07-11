"use client";

import { useEffect, useState } from "react";

import RevenueChart from "@/components/analytics/RevenueChart";
import OrdersChart from "@/components/analytics/OrdersChart";
import PaymentChart from "@/components/analytics/PaymentChart";
import TopGames from "@/components/analytics/TopGames";
import StatsCards from "@/components/analytics/StatsCards";
import RecentOrders from "@/components/analytics/RecentOrders";

interface Order {
  _id: string;
  playerName: string;
  game: string;
  package: string;
  payment: string;
  status: string;
  createdAt: string;
}

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
    fetchAnalytics();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchAnalytics() {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();

      if (data.success) {
        setAnalytics(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!analytics) {
    return (
      <main className="min-h-screen bg-[#070b1d] text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b1d] text-white p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        📊 Analytics Dashboard
      </h1>

      <StatsCards analytics={analytics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <RevenueChart analytics={analytics} />
        <OrdersChart analytics={analytics} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <PaymentChart analytics={analytics} />
        <TopGames analytics={analytics} />
      </div>

      <div className="mt-8">
        <RecentOrders orders={orders} />
      </div>

    </main>
  );
}