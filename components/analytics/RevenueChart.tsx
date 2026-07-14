"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { Analytics } from "@/types";

interface RevenueChartProps {
  analytics: Analytics;
}

export default function RevenueChart({
  analytics,
}: RevenueChartProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        Revenue Overview
      </h2>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics.monthlyRevenue}>
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}