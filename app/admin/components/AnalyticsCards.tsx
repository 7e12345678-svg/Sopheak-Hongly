"use client";

interface Props {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;
}

export default function AnalyticsCards({
  totalOrders,
  pendingOrders,
  completedOrders,
  totalRevenue,
  todayRevenue,
  monthlyRevenue,
}: Props) {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "📦",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: "⏳",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: "✅",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: "💰",
      color: "text-green-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Today Revenue",
      value: `$${todayRevenue}`,
      icon: "📅",
      color: "text-cyan-400",
      bg: "bg-sky-500/10",
    },
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue}`,
      icon: "📈",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-700 p-6 transition-all duration-300 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,.25)]"
        >
          <div
            className={`w-16 h-16 rounded-2xl ${card.bg} flex items-center justify-center text-4xl`}
          >
            {card.icon}
          </div>

          <h2 className="mt-4 text-gray-400">
            {card.title}
          </h2>

          <p className={`text-3xl font-bold mt-2 ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}