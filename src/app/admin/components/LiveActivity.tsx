"use client";

import { useCallback, useEffect, useState } from "react";

interface Order {
  _id: string;
  playerName: string;
  game: string;
  package: string;
  status: "Pending" | "Completed";
  createdAt: string;
}

export default function LiveActivity() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/live-orders", {
  cache: "no-store",
});

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders.slice(0, 5));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 3000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  return (
    <section className="bg-slate-950 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
          🔥 Live Top Up Activity
        </h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-400"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-cyan-400">
                  {order.playerName}
                </h3>

                <p className="mt-1 truncate text-sm text-slate-300">
                  Purchased{" "}
                  <span className="font-semibold text-white">
                    {order.package}
                  </span>{" "}
                  for{" "}
                  <span className="text-cyan-400">
                    {order.game}
                  </span>
                </p>
              </div>

              <span
                className={`ml-4 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                  order.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </section>
  );
}