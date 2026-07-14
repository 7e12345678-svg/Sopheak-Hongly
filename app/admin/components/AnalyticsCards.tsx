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
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Today Revenue",
      value: `$${todayRevenue}`,
      icon: "📅",
      color: "text-sky-400",
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
    <div
      className="
        grid
        grid-cols-2
        gap-4
        md:grid-cols-3
        xl:grid-cols-6
      "
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            group
            rounded-2xl
            border
            border-slate-700
            bg-slate-900/90
            p-4
            sm:p-5
            xl:p-6
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-cyan-500
            hover:shadow-[0_0_30px_rgba(34,211,238,.25)]
          "
        >
          <div
            className={`
              flex
              h-12
              w-12
              sm:h-14
              sm:w-14
              xl:h-16
              xl:w-16
              items-center
              justify-center
              rounded-2xl
              text-2xl
              sm:text-3xl
              xl:text-4xl
              ${card.bg}
            `}
          >
            {card.icon}
          </div>

          <h2 className="mt-4 text-xs sm:text-sm text-slate-400">
            {card.title}
          </h2>

          <p
            className={`
              mt-2
              text-xl
              sm:text-2xl
              xl:text-3xl
              font-bold
              break-words
              ${card.color}
            `}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}