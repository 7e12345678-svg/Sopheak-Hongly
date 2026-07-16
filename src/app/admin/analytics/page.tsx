"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        Loading Analytics...
      </main>
    );
  }

      return (
    <main className="min-h-screen bg-[#070b1d] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1700px] p-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              Dashboard
            </p>

            <h1 className="mt-2 text-5xl font-black">
              Analytics Overview
            </h1>

            <p className="mt-3 max-w-xl text-slate-400">
              Monitor revenue, customer activity,
              payment methods and monthly growth
              in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 px-8 py-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">
              Last Updated
            </p>

            <h2 className="mt-2 text-3xl font-bold text-cyan-400">
              {new Date().toLocaleTimeString()}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <StatsCards analytics={analytics} />

        {/* Revenue + Orders */}
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <RevenueChart orders={orders} />
          <OrdersChart analytics={analytics} />
        </div>

        {/* Payment + Top Games */}
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <PaymentChart analytics={analytics} />
          <TopGames analytics={analytics} />
        </div>

        {/* Recent Orders */}
        <div className="mt-10">
          <RecentOrders orders={orders} />
        </div>

      </div>
    </main>
  );
}