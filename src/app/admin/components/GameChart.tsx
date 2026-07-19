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
];


function normalizeGame(game: string) {

  const value = game
    .trim()
    .toLowerCase();


  if (
    value.includes("mobile") &&
    value.includes("legend") ||
    value === "mlbb" ||
    value === "ml"
  ) {
    return "Mobile Legends";
  }


  if (
    value.includes("pubg")
  ) {
    return "PUBG Mobile";
  }


  if (
    value.includes("free") ||
    value === "ff"
  ) {
    return "Free Fire";
  }


  if (
    value.includes("roblox")
  ) {
    return "Roblox";
  }


  return null;
}


export default function GameChart({
  orders,
}: GameChartProps) {


  const games = {
    "Mobile Legends": 0,
    "PUBG Mobile": 0,
    "Free Fire": 0,
    "Roblox": 0,
  };


  orders.forEach((order)=>{

    const game = normalizeGame(order.game);

    if(game){
      games[game]++;
    }

  });



  const data = Object.entries(games)
    .map(([game, orders])=>({
      game,
      orders,
    }));



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

          <BarChart
            data={data}
            margin={{
              top:20,
              right:20,
              left:0,
              bottom:20,
            }}
          >


            <CartesianGrid
              stroke="#334155"
              strokeDasharray="4 4"
              vertical={false}
            />


            <XAxis
              dataKey="game"
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={60}
              tick={{
                fill:"#94a3b8",
                fontSize:12,
              }}
            />


            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill:"#94a3b8",
              }}
            />


            <Tooltip />


            <Bar
              dataKey="orders"
              radius={[10,10,0,0]}
            >

              {data.map((item,index)=>(
                <Cell
                  key={item.game}
                  fill={
                    COLORS[index]
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