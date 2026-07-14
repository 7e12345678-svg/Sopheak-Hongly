"use client";

import { useEffect, useState } from "react";

import type { Customer, Order } from "@/types";

interface Props {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

interface CustomerOrdersResponse {
  success: boolean;
  orders: Order[];
}

export default function CustomerDetailsModal({
  open,
  customer,
  onClose,
}: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !customer) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/customers/${customer.phone}`
        );

        const data: CustomerOrdersResponse =
          await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customer, open]);

  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-[#111827] p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-cyan-400">
            👤 Customer Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Customer Info */}

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400">
              Player Name
            </p>

            <h3 className="text-xl font-bold">
              {customer.playerName}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Phone
            </p>

            <h3 className="text-xl font-bold">
              {customer.phone}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Total Orders
            </p>

            <h3 className="text-xl font-bold">
              {customer.totalOrders}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Total Spent
            </p>

            <h3 className="text-xl font-bold text-green-400">
              ${customer.totalSpent}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Favorite Game
            </p>

            <h3 className="text-xl font-bold">
              {customer.favoriteGame}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Last Order
            </p>

            <h3 className="text-xl font-bold">
              {new Date(
                customer.lastOrder
              ).toLocaleDateString()}
            </h3>
          </div>
        </div>

        <hr className="my-8 border-slate-700" />

        <h2 className="mb-5 text-2xl font-bold text-cyan-400">
          📦 Order History
        </h2>

        {loading ? (
          <div className="py-10 text-center">
            Loading...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            No Orders Found
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-slate-700 bg-slate-800 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      {order.game}
                    </h3>

                    <p className="text-gray-400">
                      {order.package}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">
                      ${order.price}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-sm ${
                        order.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}