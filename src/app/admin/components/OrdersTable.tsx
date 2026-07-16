"use client";

import Image from "next/image";
import type { Order } from "../../../hooks/useOrders";
import EmptyState from "@/components/ui/EmptyState";


interface Props {
  orders: Order[];
  onView: (order: Order) => void;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OrdersTable({
  orders,
  onView,
  onConfirm,
  onDelete,
}: Props) {
  return (
  <>
    {orders.length === 0 ? (
      <EmptyState
        title="No Orders"
        description="Waiting for new orders..."
      />
    ) : (
      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">Game</th>
              <th className="p-4 text-left">Package</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Screenshot</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >
                <td className="p-4">{order.playerName}</td>

                <td className="p-4">{order.game}</td>

                <td className="p-4">{order.package}</td>

                <td className="p-4">{order.payment}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-center">
                  {order.screenshot ? (
                    <Image
                      src={order.screenshot}
                      alt="Payment"
                      width={70}
                      height={70}
                      className="rounded-lg mx-auto"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(order)}
                      className="rounded-lg bg-cyan-600 px-3 py-2 hover:bg-cyan-500"
                    >
                      👁
                    </button>

                    <button
                      disabled={order.status === "Completed"}
                      onClick={() => onConfirm(order._id)}
                      className={`rounded-lg px-3 py-2 ${
                        order.status === "Completed"
                          ? "cursor-not-allowed bg-gray-600"
                          : "bg-green-600 hover:bg-green-500"
                      }`}
                    >
                      ✅
                    </button>

                    <button
                      onClick={() => onDelete(order._id)}
                      className="rounded-lg bg-red-600 px-3 py-2 hover:bg-red-500"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
)};
