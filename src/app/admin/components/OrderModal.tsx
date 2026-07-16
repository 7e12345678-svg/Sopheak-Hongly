"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { Order } from "../../../hooks/useOrders";
import { useEffect } from "react";
import { X } from "lucide-react";
import {
  CheckCircle,
  Trash2,
} from "lucide-react";



interface Props {
  order: Order | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
  onZoom: () => void;
}

export default function OrderModal({
  order,
  onClose,
  onConfirm,
  onDelete,
  onZoom,
}: Props) {
 

  useEffect(() => {
  if (!order) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [order, onClose]);

if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
      
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
>
        <motion.div
  onClick={(e) => e.stopPropagation()}
  initial={{ scale: 0.8, opacity: 0, y: 50 }}
  animate={{ scale: 1, opacity: 1, y: 0 }}
  exit={{ scale: 0.8, opacity: 0, y: 50 }}
  transition={{ duration: 0.3 }}
  className="
w-full
max-w-4xl
max-h-[90vh]
overflow-y-auto
rounded-2xl
border
border-slate-700
bg-slate-900
p-8
"
>
          <div className="mb-8 flex items-center justify-between">
  <h2 className="text-3xl font-bold text-cyan-400">
    Order Details
  </h2>

  <button
    onClick={onClose}
    aria-label="Close"
    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
  >
    <X size={24} />
  </button>
</div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">

              <p><b>🎮 Game :</b> {order.game}</p>

              <p><b>👤 Player :</b> {order.playerName}</p>

              <div className="flex items-center gap-3">

                <p>
                  <b>🆔 Game ID :</b> {order.gameId}
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(order.gameId);
                    toast.success("Copied!");
                  }}
                  className="bg-cyan-600 px-2 py-1 rounded"
                >
                  📋
                </button>

              </div>

              <p><b>🌐 Server :</b> {order.serverId}</p>

              <p><b>💎 Package :</b> {order.package}</p>

              <p><b>💳 Payment :</b> {order.payment}</p>

              <div className="flex items-center gap-3">

                <p>
                  <b>📱 Phone :</b> {order.phone}
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(order.phone);
                    toast.success("Phone copied!");
                  }}
                  className="bg-cyan-600 px-2 py-1 rounded"
                >
                  📋
                </button>

              </div>

              <p>
                <b>📅 Date :</b>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p>
                <b>Status :</b>{" "}
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
              </p>

            </div>

            <div className="flex justify-center items-center">

              {order.screenshot ? (
                <Image
  src={order.screenshot}
  alt="Payment Screenshot"
  width={320}
  height={320}
  loading="lazy"
  onClick={onZoom}
  className="
    h-[320px]
    w-full
    max-w-[320px]
    rounded-2xl
    object-cover
    cursor-zoom-in
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-2xl
    hover:shadow-cyan-500/20
  "
/>
              ) : (
                <p>No Screenshot</p>
              )}

            </div>
          </div>

          <div className="flex gap-4 mt-8">

            <button
  disabled={order.status === "Completed"}
  onClick={() => onConfirm(order._id)}
  className={`
    flex
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    py-3
    font-bold
    transition
    ${
      order.status === "Completed"
        ? "cursor-not-allowed bg-slate-600"
        : "bg-green-600 hover:bg-green-500"
    }
  `}
>
  <CheckCircle size={18} />
  {order.status === "Completed"
    ? "Confirmed"
    : "Confirm"}
</button>

        
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}