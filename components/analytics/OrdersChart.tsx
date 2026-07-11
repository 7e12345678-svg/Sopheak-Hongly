"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface OrdersChartProps {
  analytics: any;
}

export default function OrdersChart({
  analytics,
}: OrdersChartProps) {
  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-700 p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Orders Overview
      </h2>

      <div className="h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={analytics.monthlyOrders}>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}