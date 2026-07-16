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

interface RevenueChartProps {
  orders: {
    createdAt: string;
    status: string;
    price: number;
  }[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type TooltipData = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipData) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-cyan-400">
        {formatCurrency(Number(payload[0].value))}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        Revenue this month
      </p>
    </div>
  );
}

export default function RevenueChart({
  orders,
}: RevenueChartProps) {
  const revenueByMonth = Array(12).fill(0);

  orders.forEach((order) => {
    if (order.status !== "Completed") return;

    const month = new Date(
      order.createdAt
    ).getMonth();

    revenueByMonth[month] += Number(
      order.price || 0
    );
  });

  const chartData = MONTHS.map(
    (month, index) => ({
      month,
      revenue: Number(
        revenueByMonth[index].toFixed(2)
      ),
    })
  );

  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const highestMonth =
    chartData.length === 0
      ? {
          month: "-",
          revenue: 0,
        }
      : chartData.reduce((prev, current) =>
          prev.revenue > current.revenue
            ? prev
            : current
        );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl">
      {/* Header */}

      <div className="flex flex-col gap-5 border-b border-slate-800 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Analytics
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Revenue Overview
          </h2>

          <p className="mt-2 text-slate-400">
            Monthly completed order
            revenue
          </p>
        </div>

        <div className="flex gap-4">
          <div className="rounded-2xl bg-slate-800 px-5 py-4">
            <p className="text-xs text-slate-400">
              Total Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold text-emerald-400">
              {formatCurrency(
                totalRevenue
              )}
            </h3>
          </div>

          <div className="rounded-2xl bg-cyan-500/10 px-5 py-4">
            <p className="text-xs text-slate-400">
              Best Month
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {highestMonth.month}
            </h3>
          </div>
        </div>
      </div>

      {/* Chart */}

      <div className="h-[420px] p-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 15,
              left: 0,
              bottom: 0,
            }}
          >
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
                  stopColor="#06b6d4"
                  stopOpacity={0.7}
                />

                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

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
              tickFormatter={(value) =>
                `$${value}`
              }
              tick={{
                fill: "#94a3b8",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#06b6d4",
                strokeWidth: 2,
              }}
              content={(props) => (
                <CustomTooltip
                  {...props}
                />
              )}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22d3ee"
              strokeWidth={4}
              fill="url(#revenueGradient)"
              animationDuration={700}
              animationEasing="ease-out"
              activeDot={{
                r: 7,
                fill: "#fff",
                stroke: "#22d3ee",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}