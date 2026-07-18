"use client";

import { Order } from "@/hooks/useOrders";
import EmptyState from "./EmptyState";
import OrderRow from "./OrderRow";

interface Props {
  orders: Order[];
  onView: (order: Order) => void;
  onConfirm: (order: Order) => void;
  onDelete: (id: string) => void;
}

export default function OrdersTable({
  orders,
  onView,
  onConfirm,
  onDelete,
}: Props) {
  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr className="text-left text-sm uppercase tracking-wider text-slate-400">
              <th className="px-6 py-5">Game</th>
              <th className="px-6 py-5">Player</th>
              <th className="px-6 py-5">Payment</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onView={onView}
                onConfirm={onConfirm}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-4">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-cyan-400">
            {orders.length}
          </span>{" "}
          orders
        </p>

        <div className="text-sm text-slate-500">
          Admin Dashboard
        </div>
      </div>
    </div>
  );
}