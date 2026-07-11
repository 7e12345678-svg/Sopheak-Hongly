"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type GameChartProps = {
  orders: {
    game: string;
  }[];
};

export default function GameChart({
  orders,
}: GameChartProps) {

  const games = [
    "Mobile Legends",
    "PUBG Mobile",
    "Free Fire",
    "Roblox",
  ];

  const data = games.map((game) => ({
    game:
      game === "Mobile Legends"
        ? "MLBB"
        : game === "PUBG Mobile"
        ? "PUBG"
        : game === "Free Fire"
        ? "FF"
        : "Roblox",

    orders: orders.filter(
      (order) => order.game === game
    ).length,
  }));

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Orders by Game
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="game"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}