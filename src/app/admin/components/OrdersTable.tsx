"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Eye, Trash2, CheckCircle2 } from "lucide-react";
import { Order } from "@/hooks/useOrders";

interface Props {
  orders: Order[];
  onView: (order: Order) => void;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
}

function getGameImage(game: string) {
  const name = game.toLowerCase().trim();

  if (
    name.includes("mobile legend") ||
    name.includes("mobile legends") ||
    name.includes("mlbb")
  ) {
    return "/images/mlbb.jpg";
  }

  if (
    name.includes("pubg")
  ) {
    return "/images/pubg.jpg";
  }

  if (
    name.includes("free fire") ||
    name.includes("freefire") ||
    name === "ff"
  ) {
    return "/images/freefire.jpg";
  }

  if (name.includes("roblox")) {
    return "/images/roblox.jpg";
  }

  return "/images/default-game.jpg";
}


export default function OrdersTable({
  orders,
  onView,
  onConfirm,
  onDelete,
}: Props) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const allSelected =
    orders.length > 0 &&
    selectedRows.length === orders.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map((o) => o._id));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const totalSelected = useMemo(
    () => selectedRows.length,
    [selectedRows]
  );

  const paymentColor: Record<string, string> = {
  ABA: "bg-blue-500/20 text-blue-400",
  ACLEDA: "bg-red-500/20 text-red-400",
  Wing: "bg-orange-500/20 text-orange-400",
  AMK: "bg-green-500/20 text-green-400",
};

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 py-24 text-center">
        <h2 className="text-3xl font-bold text-white">
          No Orders Found
        </h2>

        <p className="mt-3 text-slate-400">
          Try changing your filters.
        </p>
      </div>
    );
  }
      return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        shadow-2xl
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-800
          bg-slate-950
          px-6
          py-5
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-white">
            Orders Management
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Total {orders.length} Orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          {totalSelected > 0 && (
            <div
              className="
                rounded-xl
                bg-cyan-500/10
                px-4
                py-2
                font-semibold
                text-cyan-400
              "
            >
              {totalSelected} Selected
            </div>
          )}

          <div
            className="
              rounded-xl
              bg-green-500/10
              px-4
              py-2
              text-green-400
            "
          >
            Live
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="
          max-h-[700px]
          overflow-auto
        "
      >
        <table className="min-w-full">
          <thead
            className="
              sticky
              top-0
              z-20
              bg-slate-950
            "
          >
            <tr
              className="
                border-b
                border-slate-800
                text-left
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              <th className="w-14 px-5 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-cyan-500"
                />
              </th>

              <th className="px-5 py-4">
                Game
              </th>

              <th className="px-5 py-4">
                Player
              </th>

              <th className="px-5 py-4">
                Server
              </th>

              <th className="px-5 py-4">
                Package
              </th>

              <th className="px-5 py-4">
                Payment
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4">
                Date
              </th>

              <th className="text-center px-5 py-4">
                Actions
              </th>
            </tr>
          </thead>

          
            <tbody>
  {orders.map((order) => {
   
  const gameImage = getGameImage(order.game);

    return (
      <tr
        key={order._id}
        className="border-b border-slate-800 transition hover:bg-cyan-500/5
hover:shadow-lg
transition-all
duration-300"
      >
        {/* Checkbox */}
        <td className="px-5 py-4">
          <input
            type="checkbox"
            checked={selectedRows.includes(order._id)}
            onChange={() => toggleOne(order._id)}
            className="h-4 w-4 accent-cyan-500"
          />
        </td>

        {/* Game */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Image
              src={gameImage}
              alt={order.game}
              width={48}
              height={48}
              className="rounded-xl object-cover"
            />

            <div>
              <p className="font-semibold text-white">
                {order.game}
              </p>

              <p className="text-sm text-slate-400">
                ${order.price.toLocaleString()}
              </p>
            </div>
          </div>
        </td>

        {/* Player */}
        <td className="px-5 py-4">
          <div>
            <p className="font-semibold text-white">
              {order.playerName}
            </p>

            <p className="text-sm text-slate-400">
              {order.phone}
            </p>
          </div>
        </td>

        {/* Server */}
        <td className="px-5 py-4 text-slate-300">
          {order.serverId}
        </td>

        {/* Package */}
        <td className="px-5 py-4">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
            {order.package}
          </span>
        </td>

        {/* Payment */}
        <td className="px-5 py-4">
          <span
  className={`rounded-full px-3 py-1 text-sm font-semibold ${
    paymentColor[order.payment] ??
    "bg-slate-700 text-slate-300"
  }`}
>
  {order.payment}
</span>
        </td>

        {/* Status */}
        <td className="px-5 py-4">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              order.status === "Completed"
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {order.status}
          </span>
        </td>

        {/* Date */}
        <td className="px-5 py-4 text-sm text-slate-400">
          {new Date(order.createdAt).toLocaleString("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
})}
        </td>

        {/* Actions */}
        <td className="px-5 py-4">
          <div className="flex justify-center gap-2">

            <button
              onClick={() => onView(order)}
              className="rounded-lg bg-sky-500/20 p-2 text-sky-400 transition hover:bg-sky-500 hover:text-white"
            >
              <Eye size={18} />
            </button>

            {order.status !== "Completed" && (
              <button
                onClick={() => onConfirm(order._id)}
                className="rounded-lg bg-green-500/20 p-2 text-green-400 transition hover:bg-green-500 hover:text-white"
              >
                <CheckCircle2 size={18} />
              </button>
            )}

            <button
              onClick={() => onDelete(order._id)}
              className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={18} />
            </button>

          </div>
        </td>
      </tr>
    );
  })}
</tbody>   
                  </table>
      </div>

      {/* Footer */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-slate-800
          bg-slate-950
          px-6
          py-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <p className="font-semibold text-cyan-400">
            Showing {orders.length} Orders
          </p>

          <p className="text-sm text-slate-500">
            Selected {totalSelected} / {orders.length}
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-2
              text-sm
              text-slate-300
              transition
              hover:bg-slate-800
            "
          >
            Previous
          </button>

          <button
            className="
              rounded-xl
              bg-cyan-500
              px-4
              py-2
              text-sm
              font-semibold
              text-black
            "
          >
            1
          </button>

          <button
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-2
              text-sm
              text-slate-300
              transition
              hover:bg-slate-800
            "
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}
          