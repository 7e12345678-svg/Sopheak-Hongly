"use client";

import Image from "next/image";
import type { Order } from "../../../hooks/useOrders";
import EmptyState from "@/components/ui/EmptyState";
import {
  Eye,
  CheckCircle,
  Trash2,
} from "lucide-react";


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
      <div className="
overflow-x-auto
rounded-2xl
border
border-slate-700
bg-slate-900
shadow-xl
ring-1
ring-slate-800
">
        <table className="min-w-[1100px] w-full">
          <thead
  className="
    sticky
    top-0
    z-20
    border-b
    border-slate-700
    bg-slate-800/95
    backdrop-blur
  "
>
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-300">Player</th>
              <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-300">Game</th>
              <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-300">Package</th>
              <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-300">Payment</th>
              <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-300">Status</th>
              <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-300">Date</th>
              <th className="p-4 text-center">Screenshot</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {orders.map((order) => (
              <tr
                key={order._id}
                className=" odd:bg-slate-900
even:bg-slate-800/30
hover:bg-cyan-500/5
transition-colors"
              >
                <td className="
p-4
whitespace-nowrap
">{order.playerName}</td>

                <td className="
p-4
whitespace-nowrap
">{order.game}</td>

                <td className="
p-4
whitespace-nowrap
">{order.package}</td>

                <td className="
p-4
whitespace-nowrap
">{order.payment}</td>

                <td className="
p-4
whitespace-nowrap
">
                  <span
  className={`
    inline-flex
    items-center
    gap-2
    rounded-full
    px-3
    py-1
    text-xs
    font-semibold
    ${
      order.status === "Completed"
        ? "bg-green-500/20 text-green-400"
        : "bg-yellow-500/20 text-yellow-400"
    }
  `}
>
  <span
    className={`
      h-2
      w-2
      rounded-full
      ${
        order.status === "Completed"
          ? "bg-green-400"
          : "bg-yellow-400"
      }
    `}
  />

  {order.status}
</span>
                </td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString(
  "en-US",
  {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
)}
                </td>

                <td className="p-4 text-center">
                  {order.screenshot ? (
                    <Image
                      src={order.screenshot}
                      alt="Payment"
                      width={70}
                      height={70}
                      loading="lazy"
                      title="Click to view"
                      onClick={() => onView(order)}
                      className="
mx-auto
rounded-lg
cursor-pointer
transition
duration-300
hover:scale-110
shadow-lg
hover:shadow-cyan-500/30
object-cover
h-[70px]
w-[70px]
"
                    
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                    aria-label="View Order"
                    title="View Order"
  onClick={() => onView(order)}
  className="
rounded-xl
bg-cyan-600
p-2
transition-all
duration-200
hover:scale-105
hover:bg-cyan-500

"
>
  
  <Eye size={18} />
</button>

                    <button
  aria-label="Confirm Order"
  title="Confirm Order"
  disabled={order.status === "Completed"}
  onClick={() => onConfirm(order._id)}
  className={`
    rounded-xl
    p-2
    transition-all
    duration-200
    ${
      order.status === "Completed"
        ? "cursor-not-allowed bg-slate-600"
        : "bg-green-600 hover:scale-105 hover:bg-green-500"
    }
  `}
>
  <CheckCircle size={18} />
</button>

                    <button
  aria-label="Delete Order"
  title="Delete Order"
  onClick={() => onDelete(order._id)}
  className="
    rounded-xl
    bg-red-600
    p-2
    transition-all
    duration-200
    hover:scale-105
    hover:bg-red-500
  "
>
  <Trash2 size={18} />
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
