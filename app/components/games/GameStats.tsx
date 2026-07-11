"use client";

import {
  Gamepad2,
  Eye,
  EyeOff,
  Sparkles,
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
  const stats = [
    {
      title: "Total Games",
      value: total,
      icon: <Gamepad2 size={30} />,
      color:
        "from-cyan-500/20 to-cyan-700/10 border-cyan-500/30 text-cyan-400",
    },
    {
      title: "Active Games",
      value: active,
      icon: <Eye size={30} />,
      color:
        "from-green-500/20 to-green-700/10 border-green-500/30 text-green-400",
    },
    {
      title: "Hidden Games",
      value: hidden,
      icon: <EyeOff size={30} />,
      color:
        "from-red-500/20 to-red-700/10 border-red-500/30 text-red-400",
    },
    {
      title: "Newest Game",
      value: newest || "-",
      icon: <Sparkles size={30} />,
      color:
        "from-yellow-500/20 to-yellow-700/10 border-yellow-500/30 text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`rounded-2xl border bg-gradient-to-br ${item.color} p-6 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold text-white mt-3">
                {item.value}
              </h2>
            </div>

            <div className="opacity-90">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}