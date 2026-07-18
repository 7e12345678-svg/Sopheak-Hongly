"use client";

import { Eye, CheckCircle2, Trash2 } from "lucide-react";
import { Order } from "@/hooks/useOrders";

interface ActionButtonsProps {
  order: Order;
  onView: (order: Order) => void;
  onConfirm: (order: Order) => void;
  onDelete: (id: string) => void;
}

export default function ActionButtons({
  order,
  onView,
  onConfirm,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* View */}
      <button
        onClick={() => onView(order)}
        className="rounded-xl bg-sky-500/15 p-2 text-sky-400 transition hover:bg-sky-500 hover:text-white"
      >
        <Eye size={18} />
      </button>

      {/* Complete */}
      {order.status !== "Completed" && (
        <button
          onClick={() => onConfirm(order)}
          className="rounded-xl bg-green-500/15 p-2 text-green-400 transition hover:bg-green-500 hover:text-white"
        >
          <CheckCircle2 size={18} />
        </button>
      )}

      {/* Delete */}
      <button
        onClick={() => onDelete(order._id)}
        className="rounded-xl bg-red-500/15 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}