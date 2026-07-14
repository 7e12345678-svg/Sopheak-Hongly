"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { Analytics } from "@/types";

interface PaymentChartProps {
  analytics: Analytics;
}

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
];

export default function PaymentChart({
  analytics,
}: PaymentChartProps) {
  const data = [
    {
      name: "ABA",
      value: analytics.paymentMethods.ABA,
    },
    {
      name: "ACLEDA",
      value: analytics.paymentMethods.ACLEDA,
    },
    {
      name: "Wing",
      value: analytics.paymentMethods.Wing,
    },
    {
      name: "TrueMoney",
      value: analytics.paymentMethods.TrueMoney,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        Payment Methods
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}