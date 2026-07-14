"use client";

import type { Customer } from "@/types";

interface Props {
  customers: Customer[];
  onView: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onView,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-[#111827]">
      <table className="w-full">
        <thead className="bg-[#0f172a]">
          <tr>
            <th className="p-4 text-left">Player</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-center">Orders</th>
            <th className="p-4 text-center">Spent</th>
            <th className="p-4 text-center">Favorite Game</th>
            <th className="p-4 text-center">Last Order</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.phone}
              className="border-t border-slate-700 transition hover:bg-slate-800"
            >
              <td className="p-4">
                {customer.playerName}
              </td>

              <td className="p-4">
                {customer.phone}
              </td>

              <td className="text-center">
                {customer.totalOrders}
              </td>

              <td className="text-center font-bold text-green-400">
                ${customer.totalSpent}
              </td>

              <td className="text-center">
                {customer.favoriteGame}
              </td>

              <td className="text-center">
                {new Date(customer.lastOrder).toLocaleDateString()}
              </td>

              <td className="text-center">
                <button
                  onClick={() => onView(customer)}
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold transition hover:bg-cyan-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-gray-500"
              >
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}