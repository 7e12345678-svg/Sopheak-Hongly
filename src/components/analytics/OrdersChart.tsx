"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import type { Order } from "@/types";

interface OrdersChartProps {
  orders: Order[];
}

const BAR_COLORS = [
  "#06b6d4",
  "#0891b2",
  "#0ea5e9",
  "#38bdf8",
  "#22d3ee",
];

function CustomTooltip(props: any) {
  const { active, payload, label } = props;

  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-slate-900 p-4">
      <p className="text-slate-400">Day {label}</p>

      <h3 className="text-xl font-bold text-cyan-400">
        {payload[0].value} Orders
      </h3>
    </div>
  );
}

export default function OrdersChart({
  orders,
}: OrdersChartProps) {

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const ordersByDay = Array(daysInMonth).fill(0);

  orders.forEach((order) => {

    const date = new Date(order.createdAt);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month
    ) {
      return;
    }

    const day = date.getDate() - 1;

    ordersByDay[day]++;
  });

  const chartData = ordersByDay.map((count, index) => ({
    day: index + 1,
    orders: count,
  }));

  const totalOrders = ordersByDay.reduce(
    (a, b) => a + b,
    0
  );

  const bestDay =
    chartData.reduce((max, item) =>
      item.orders > max.orders ? item : max
    );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
      <div className="flex justify-between border-b border-slate-800 p-6">

        <div>
          <p className="uppercase tracking-[4px] text-cyan-400 text-sm">
            Analytics
          </p>

          <h2 className="text-3xl font-bold text-white">
            Daily Orders
          </h2>

          <p className="text-slate-400 mt-2">
            Orders for each day of this month
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
              Best Day
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {bestDay.day}
            </h3>
          </div>

        </div>

      </div>

      <div className="h-[420px] p-6">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} />
              )}
            />

            <Bar
              dataKey="orders"
              radius={[10, 10, 0, 0]}
            >
              {chartData.map((item, index) => (
                <Cell
                  key={item.day}
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