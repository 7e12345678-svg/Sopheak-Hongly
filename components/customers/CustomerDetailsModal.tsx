"use client";

import { useEffect, useState } from "react";

interface Customer {
  phone: string;
  playerName: string;
  totalOrders: number;
  totalSpent: number;
  favoriteGame: string;
  lastOrder: string;
}

interface Order {
  _id: string;
  game: string;
  package: string;
  price: number;
  payment: string;
  status: string;
  createdAt: string;
}

interface Props {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function CustomerDetailsModal({
  open,
  customer,
  onClose,
}: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
  if (!customer || !open) return;

  const phone = customer.phone;

  async function fetchOrders() {
    try {
      setLoading(true);

      const res = await fetch(`/api/customers/${phone}`);
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  fetchOrders();
}, [customer, open]);


  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#111827] rounded-2xl border border-slate-700 w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-cyan-400">
            👤 Customer Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-400 text-2xl"
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

        <hr className="border-slate-700 my-8" />

        {/* Order History */}

        <h2 className="text-2xl font-bold text-cyan-400 mb-5">
          📦 Order History
        </h2>

        {loading ? (

          <div className="text-center py-10">
            Loading...
          </div>

        ) : orders.length === 0 ? (

          <div className="text-center py-10 text-gray-400">
            No Orders Found
          </div>

        ) : (

          <div className="space-y-4">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-lg font-bold">
                      {order.game}
                    </h3>

                    <p className="text-gray-400">
                      {order.package}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
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
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
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