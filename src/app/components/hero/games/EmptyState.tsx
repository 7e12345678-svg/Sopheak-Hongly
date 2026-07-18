"use client";

import {
  Gamepad2,
  Eye,
  EyeOff,
  CalendarDays,
} from "lucide-react";

interface Props {
  total: number;
  active: number;
  hidden: number;
  newest: string;
}

export default function GameStats({
  total,
  active,
  hidden,
  newest,
}: Props) {
  const cards = [
    {
      title: "Total Games",
      value: total,
      icon: <Gamepad2 size={28} />,
      color: "cyan",
    },
    {
      title: "Active Games",
      value: active,
      icon: <Eye size={28} />,
      color: "green",
    },
    {
      title: "Hidden Games",
      value: hidden,
      icon: <EyeOff size={28} />,
      color: "red",
    },
    {
      title: "Newest Game",
      value: newest || "-",
      icon: <CalendarDays size={28} />,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-white">
                {card.value}
              </h2>

            </div>

            <div className="text-cyan-400">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}