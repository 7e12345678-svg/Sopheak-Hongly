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
  const monthNames = [
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

  const revenueByMonth = new Array(12).fill(0);

  orders.forEach((order) => {
    if (order.status !== "Completed") return;

    const month = new Date(order.createdAt).getMonth();

    revenueByMonth[month] += Number(order.price || 0);
  });

  const data = monthNames.map((month, index) => ({
    month,
    revenue: Number(revenueByMonth[index].toFixed(2)),
  }));

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        Revenue Overview
      </h2>

      <div className="h-[350px]">
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
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
              tickFormatter={(value) =>
                `$${Number(value).toFixed(2)}`
              }
            />

            <Tooltip
              formatter={(value: number) => [
                formatCurrency(value),
                "Revenue",
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}