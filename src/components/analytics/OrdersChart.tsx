"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Cell,
} from "recharts";

import type { Analytics } from "@/types";

interface OrdersChartProps {
  analytics: Analytics;
}

const BAR_COLORS = [
  "#06b6d4",
  "#0891b2",
  "#0ea5e9",
  "#38bdf8",
  "#22d3ee",
  "#14b8a6",
  "#06b6d4",
  "#0891b2",
  "#0ea5e9",
  "#38bdf8",
  "#22d3ee",
  "#14b8a6",
];

export default function OrdersChart({
  analytics,
}: OrdersChartProps) {

  const chartData = analytics.monthlyOrders;

  const totalOrders = chartData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const bestMonth =
    chartData.reduce((prev, current) =>
      prev.orders > current.orders
        ? prev
        : current
    );

  function CustomTooltip({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) {
    if (!active || !payload?.length)
      return null;

    return (
      <div
        className="
          rounded-2xl
          border
          border-cyan-500/30
          bg-slate-900/95
          px-5
          py-4
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <p className="text-sm text-slate-400">
          {label}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-cyan-400">
          {payload[0].value} Orders
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Monthly completed orders
        </p>
      </div>
    );
  }
       return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-800 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Analytics
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Orders Overview
          </h2>

          <p className="mt-2 text-slate-400">
            Monthly completed orders
          </p>
        </div>

        <div className="flex gap-4">
          <div className="rounded-2xl bg-slate-800 px-5 py-4">
            <p className="text-xs text-slate-400">
              Total Orders
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {totalOrders}
            </h3>
          </div>

          <div className="rounded-2xl bg-cyan-500/10 px-5 py-4">
            <p className="text-xs text-slate-400">
              Best Month
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {bestMonth.month}
            </h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[420px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#94a3b8",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(6,182,212,.08)",
              }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="orders"
              radius={[10, 10, 0, 0]}
              animationDuration={900}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    BAR_COLORS[
                      index % BAR_COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}