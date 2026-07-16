"use client";

import { useCallback, useEffect, useState } from "react";

interface Order {
  _id: string;
  playerName: string;
  game: string;
  image: string;
  status: string;
  createdAt: string;
}

export default function RecentActivity() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/live-orders", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();

    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;

    const hrs = Math.floor(mins / 60);

    if (hrs < 24) return `${hrs} hrs ago`;

    return `${Math.floor(hrs / 24)} days ago`;
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🟢 Recent Activity
      </h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.game}
                className="h-14 w-14 rounded-xl object-cover"
              />

              <div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-green-500"></span>

                  <h3 className="font-bold text-white">
                    {order.playerName}
                  </h3>
                </div>

                <p className="text-sm text-gray-400">
                  {order.game}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                    order.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="text-right text-cyan-400">
              🕒 {timeAgo(order.createdAt)}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
}