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

const data = [
  { month: "Jan", revenue: 120 },
  { month: "Feb", revenue: 240 },
  { month: "Mar", revenue: 180 },
  { month: "Apr", revenue: 320 },
  { month: "May", revenue: 260 },
  { month: "Jun", revenue: 420 },
  { month: "Jul", revenue: 380 },
];

type RevenueChartProps = {
  orders: {
    createdAt: string;
    status: string;
    package: string;
  }[];
};

export default function RevenueChart({
  orders,
}: RevenueChartProps) {

    //Package Price
    
    const packagePrices: Record<string, number> = {
  "86 Diamonds": 1,
  "172 Diamonds": 3.5,
  "257 Diamonds": 4,
  "514 Diamonds": 10,

  "60 UC": 1,
  "325 UC": 5,
  "660 UC": 10,
  "1800 UC": 25,

  "100 Diamonds": 1,
  "310 Diamonds": 3,
  "520 Diamonds": 5,
  "1060 Diamonds": 10,

  "80 Robux": 1,
  "400 Robux": 5,
  "800 Robux": 10,
  "1700 Robux": 20,
};
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

  revenueByMonth[month] +=
    packagePrices[order.package] || 0;
});

const data = monthNames.map((month, index) => ({
  month,
  revenue: revenueByMonth[index],
}));
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Revenue Overview
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}