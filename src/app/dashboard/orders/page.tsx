"use client";

import Link from "next/link";
import { useMyOrders } from "@/hooks/useMyOrders";

function getStatusClass(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-400";
    case "Processing":
      return "bg-yellow-500/20 text-yellow-400";
    case "Pending":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-slate-500/20 text-slate-400";
  }
}

export default function MyOrdersPage() {
  const { orders, loading } = useMyOrders();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="animate-pulse text-slate-400">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-cyan-400">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          No orders found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="min-w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Tracking</th>
                <th className="p-4">Game</th>
                <th className="p-4">Package</th>
                <th className="p-4">Price</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-slate-700 transition hover:bg-slate-800"
                >
                  <td className="p-4 font-medium text-white">
                    {order.trackingCode}
                  </td>

                  <td className="p-4">{order.game}</td>

                  <td className="p-4">{order.package}</td>

                  <td className="p-4 font-semibold text-cyan-400">
                    ${order.price}
                  </td>

                  <td className="p-4">{order.payment}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">
                    <Link
                      href={`/dashboard/orders/${order._id}`}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}