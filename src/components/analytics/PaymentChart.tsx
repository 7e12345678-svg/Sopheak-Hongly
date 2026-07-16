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

  const chartData = [
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

  const totalPayments = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const topPayment =
  chartData.length === 0
    ? { name: "-", value: 0 }
    : chartData.reduce((max, item) =>
        item.value > max.value
          ? item
          : max
      );

function CustomTooltip(props: any) {
  const { active, payload } = props;

    if (!active || !payload?.length)
      return null;

    const item = payload[0];

const name = String(item.name ?? "");
const value = Number(item.value ?? 0);



    const percentage =
  totalPayments === 0
    ? "0.0"
    : ((value / totalPayments) * 100).toFixed(1);

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
          {name}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-cyan-400">
          {value} Payments
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {percentage}% of all payments
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
            Payment Methods
          </h2>

          <p className="mt-2 text-slate-400">
            Distribution of payment methods
          </p>
        </div>

        <div className="flex gap-4">
          <div className="rounded-2xl bg-slate-800 px-5 py-4">
            <p className="text-xs text-slate-400">
              Total Payments
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {totalPayments}
            </h3>
          </div>

          <div className="rounded-2xl bg-cyan-500/10 px-5 py-4">
            <p className="text-xs text-slate-400">
              Most Used
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              {topPayment.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex h-[420px] items-center justify-center p-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={135}
              paddingAngle={5}
              animationDuration={700}
animationEasing="ease-out"
            >
              {chartData.map((item, index) => (
  <Cell
    key={item.name}
    fill={COLORS[index % COLORS.length]}
    stroke="#0f172a"
    strokeWidth={3}
  />
))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                color: "#cbd5e1",
                paddingTop: "20px",
                fontSize: "14px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Summary */}
        <div className="pointer-events-none absolute flex flex-col items-center justify-center">
          <span className="text-sm text-slate-400">
            Total
          </span>

          <span className="text-3xl font-bold text-white">
            {totalPayments}
          </span>

          <span className="mt-1 text-xs text-cyan-400">
            Payments
          </span>
        </div>
      </div>
    </div>
  );
}