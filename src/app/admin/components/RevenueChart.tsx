"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type RevenueChartProps = {
  orders: {
    createdAt: string;
    status: string;
    price: number;
  }[];
};

export default function RevenueChart({
  orders,
}: RevenueChartProps) {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const revenueByDay = Array(daysInMonth).fill(0);

  orders.forEach((order) => {
    if (order.status !== "Completed") return;

    const date = new Date(order.createdAt);

    if (
      date.getFullYear() !== currentYear ||
      date.getMonth() !== currentMonth
    ) {
      return;
    }

    revenueByDay[date.getDate() - 1] += Number(
      order.price || 0
    );
  });

  const data = revenueByDay.map((revenue, index) => ({
    day: index + 1,
    revenue: Number(revenue.toFixed(2)),
  }));

  // ============================
  // Dashboard Statistics
  // ============================

  const totalRevenue = revenueByDay.reduce(
    (sum, value) => sum + value,
    0
  );

  const todayRevenue =
    revenueByDay[currentDay - 1] || 0;

  const highestRevenue = Math.max(...revenueByDay);

  const highestDay =
    revenueByDay.indexOf(highestRevenue) + 1;

  const averageRevenue =
    totalRevenue / currentDay;

  // ============================
  // Tooltip
  // ============================

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: any) => {
    if (
      !active ||
      !payload ||
      !payload.length
    ) {
      return null;
    }

    return (
      <div className="rounded-xl border border-cyan-500/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md">
        <p className="mb-2 text-xs uppercase tracking-[3px] text-cyan-400">
          Day {label}
        </p>

        <div className="space-y-1">
          <p className="text-sm text-slate-300">
            Revenue
          </p>

          <h3 className="text-2xl font-bold text-white">
            {formatCurrency(
              payload[0].value
            )}
          </h3>
        </div>

        <div className="mt-3 border-t border-slate-700 pt-3">
          <p className="text-xs text-slate-400">
            Monthly Revenue Analytics
          </p>
        </div>
      </div>
    );
  };
       return (
    <div className="rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl">

      {/* ================= Header ================= */}

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-xs uppercase tracking-[6px] text-cyan-400">
            Revenue Analytics
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Monthly Revenue
          </h2>

          <p className="mt-2 text-slate-400">
            Daily completed revenue for this month
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4">
          <p className="text-xs uppercase tracking-[3px] text-cyan-400">
            Total Revenue
          </p>

          <h2 className="mt-1 text-3xl font-bold text-white">
            {formatCurrency(totalRevenue)}
          </h2>
        </div>

      </div>

      {/* ================= KPI Cards ================= */}

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

        {/* Today */}

        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">

          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Today
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {formatCurrency(todayRevenue)}
          </h3>

          <p className="mt-2 text-sm text-green-400">
            Current Day Revenue
          </p>

        </div>

        {/* Average */}

        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">

          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Average
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {formatCurrency(averageRevenue)}
          </h3>

          <p className="mt-2 text-sm text-cyan-400">
            Daily Average
          </p>

        </div>

        {/* Highest */}

        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">

          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Highest
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {formatCurrency(highestRevenue)}
          </h3>

          <p className="mt-2 text-sm text-yellow-400">
            Day {highestDay}
          </p>

        </div>

        {/* Month */}

        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">

          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            This Month
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {formatCurrency(totalRevenue)}
          </h3>

          <p className="mt-2 text-sm text-purple-400">
            Completed Orders
          </p>

        </div>

      </div>

      {/* ================= Chart ================= */}

      <div className="h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>
                       <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22d3ee"
                  stopOpacity={0.8}
                />
                <stop
                  offset="60%"
                  stopColor="#22d3ee"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="5 5"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <YAxis
              stroke="#94a3b8"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                formatCurrency(value)
              }
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#22d3ee",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22d3ee"
              strokeWidth={4}
              fill="url(#revenueGradient)"
              animationDuration={1200}
              animationEasing="ease-out"
              dot={{
                r: 4,
                fill: "#22d3ee",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#fff",
                stroke: "#22d3ee",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-5 text-sm">

        <p className="text-slate-400">
          Showing completed orders only
        </p>

        <p className="font-medium text-cyan-400">
          Updated automatically
        </p>

      </div>

    </div>
  );
}