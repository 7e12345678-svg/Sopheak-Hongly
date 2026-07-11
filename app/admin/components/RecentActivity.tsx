"use client";

interface Order {
  _id: string;
  playerName: string;
  game: string;
  status: string;
  createdAt: string;
}

interface Props {
  orders: Order[];
}

const gameImages: Record<string, string> = {
  "Mobile Legends": "/images/mlbb.jpg",
  "PUBG Mobile": "/images/pubg.jpg",
  "Free Fire": "/images/freefire.jpg",
  Roblox: "/images/roblox.jpg",
};

export default function RecentActivity({ orders }: Props) {
  const latestOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  const timeAgo = (date: string) => {
    const diff =
      Date.now() - new Date(date).getTime();

    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hrs ago`;

    const days = Math.floor(hours / 24);

    return `${days} days ago`;
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🟢 Recent Activity
      </h2>

      <div className="space-y-5">
        {latestOrders.map((order) => (
  <div
    key={order._id}
    className="
flex
items-center
justify-between
p-4
rounded-xl
bg-slate-800
hover:bg-slate-700
hover:scale-[1.02]
transition-all
duration-300
shadow-lg
"
  >
    <div className="flex items-center gap-4">
      <img
        src={
          gameImages[order.game] || "/images/default.jpg"
        }
        alt={order.game}
        className="w-14 h-14 rounded-xl object-cover"
      />

      <div>
        <div className="flex items-center gap-2">

  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>

  <h3 className="font-bold text-white">
    {order.playerName}
  </h3>

</div>

        <p className="text-gray-400 text-sm">
          {order.game}
        </p>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
            order.status === "Completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>

    <div className="text-right">
      <p className="text-cyan-400 text-sm">
        🕒 {timeAgo(order.createdAt)}
      </p>
    </div>
  </div>
))}
            
      </div>
    </div>
  );
}