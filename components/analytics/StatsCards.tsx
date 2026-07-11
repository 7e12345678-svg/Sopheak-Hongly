"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Gamepad2,
} from "lucide-react";

interface StatsCardsProps {
  analytics: any;
}

export default function StatsCards({
  analytics,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${analytics.stats.revenue}`,
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    },
    {
      title: "Total Orders",
      value: analytics.stats.totalOrders,
      icon: ShoppingCart,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
    },
    {
      title: "Customers",
      value: analytics.stats.totalCustomers,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
    {
      title: "Games",
      value: analytics.stats.totalGames,
      icon: Gamepad2,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} ${item.bg}
            p-6 transition hover:scale-105 duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                <Icon
                  size={34}
                  className={item.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}