"use client";

import type { Analytics } from "@/types";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PaymentChartProps = {
  orders: {
    payment: string;
  }[];
};

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#facc15",
  "#a855f7",
];

export default function PaymentChart({
  orders,
}: PaymentChartProps) {

  const payments = ["ABA", "Wing", "ACLEDA", "AMK"];

  const data = payments.map((payment) => ({
    name: payment,
    value: orders.filter(
      (order) => order.payment === payment
    ).length,
  }));

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Payment Methods
      </h2>

      <div className="h-[420px]">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        innerRadius={55}
        paddingAngle={3}
        label
      >
        {data.map((_, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend verticalAlign="bottom" />
    </PieChart>
  </ResponsiveContainer>
</div>


    </div>
  );
}