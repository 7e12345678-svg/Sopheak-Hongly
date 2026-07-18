"use client";

import { useEffect, useMemo, useState } from "react";
import { getOrders } from "@/services/orders";
import { Order } from "@/hooks/useOrders";
import {
  Search,
  ShoppingCart,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadOrders() {
    setLoading(true);

    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = search.toLowerCase();

      return (
        order.game.toLowerCase().includes(keyword) ||
        order.playerName.toLowerCase().includes(keyword) ||
        order.phone.toLowerCase().includes(keyword)
      );
    });
  }, [orders, search]);

  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const completed = orders.filter(o => o.status === "Completed").length;


  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-cyan-400">
            Orders Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all customer orders.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={total}
          icon={<ShoppingCart />}
          color="cyan"
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={<Clock3 />}
          color="yellow"
        />

        <StatCard
          title="Completed"
          value={completed}
          icon={<CheckCircle2 />}
          color="green"
        />

        
      </div>

      {/* Search */}
      <div className="mt-8 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">
        <Search className="text-slate-400" size={20} />

        <input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent px-3 py-4 outline-none"
        />
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-5 py-4 text-left">Game</th>
              <th className="px-5 py-4 text-left">Player</th>
              <th className="px-5 py-4 text-left">Package</th>
              <th className="px-5 py-4 text-left">Payment</th>
              <th className="px-5 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-400"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-400"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-slate-800"
                >
                  <td className="px-5 py-4">{order.game}</td>
                  <td className="px-5 py-4">{order.playerName}</td>
                  <td className="px-5 py-4">{order.package}</td>
                  <td className="px-5 py-4">{order.payment}</td>

                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Completed") {
    return (
      <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
        Completed
      </span>
    );
  }


  return (
    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
      Pending
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  const colors: Record<string, string> = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className={`mb-4 ${colors[color]}`}>
        {icon}
      </div>

      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>
    </div>
  );
}