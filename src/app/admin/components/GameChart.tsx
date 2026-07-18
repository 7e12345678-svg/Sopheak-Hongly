"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

type GameChartProps = {
  orders: {
    game: string;
  }[];
};

const COLORS = [
  "#06b6d4",
  "#0891b2",
  "#22d3ee",
  "#38bdf8",
  "#0ea5e9",
  "#14b8a6",
];

const gameLabels: Record<string, string> = {
  "Mobile Legends": "MLBB",
  MLBB: "MLBB",

  "PUBG Mobile": "PUBG",
  PUBG: "PUBG",

  "Free Fire": "FF",
  FF: "FF",

  Roblox: "Roblox",
};

export default function GameChart({
  orders,
}: GameChartProps) {
  const gameCounts: Record<string, number> = {};

  orders.forEach((order) => {
    const label =
      gameLabels[order.game] ?? order.game;

    gameCounts[label] =
      (gameCounts[label] || 0) + 1;
  });

  const data = Object.entries(gameCounts)
    .map(([game, orders]) => ({
      game,
      orders,
    }))
    .sort((a, b) => b.orders - a.orders);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[4px] text-cyan-400">
            Analytics
          </p>

          <h2 className="text-3xl font-bold text-white">
            Orders by Game
          </h2>

          <p className="mt-2 text-slate-400">
            Number of orders for each game
          </p>
        </div>

        <div className="rounded-xl bg-cyan-500/10 px-4 py-3">
          <p className="text-xs text-slate-400">
            Total Orders
          </p>

          <h3 className="mt-1 text-2xl font-bold text-cyan-400">
            {orders.length}
          </h3>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="game"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip />

            <Bar
              dataKey="orders"
              radius={[10, 10, 0, 0]}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.game}
                  fill={
                    COLORS[
                      index % COLORS.length
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