"use client";

import type { Order } from "@/types";

interface Props {
  orders: Order[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#11182d]">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          Recent Orders
        </h2>

        <p className="mt-1 text-gray-400">
          Latest customer purchases
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0b1020]">
            <tr>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">Game</th>
              <th className="p-4 text-left">Package</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-slate-700 transition hover:bg-slate-800"
              >
                <td className="p-4 font-semibold">
                  {order.playerName}
                </td>

                <td className="p-4">
                  {order.game}
                </td>

                <td className="p-4">
                  {order.package}
                </td>

                <td className="p-4">
                  {order.payment}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      order.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4 text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}