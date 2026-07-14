"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { Order } from "../hooks/useOrders";

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
  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 rounded-2xl border border-slate-700 p-8 w-full max-w-4xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-cyan-400">
              Order Details
            </h2>

            <button
              onClick={onClose}
              className="text-red-400 text-3xl"
            >
              ✕
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
                  className={
                    order.status === "Completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {order.status}
                </span>
              </p>

            </div>

            <div className="flex justify-center items-center">

              {order.screenshot ? (
                <Image
                  src={order.screenshot}
                  alt="Screenshot"
                  width={250}
                  height={250}
                  onClick={onZoom}
                  className="cursor-pointer rounded-xl hover:scale-105 transition"
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
              className={`flex-1 py-3 rounded-xl font-bold ${
                order.status === "Completed"
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {order.status === "Completed"
                ? "✅ Confirmed"
                : "✅ Confirm"}
            </button>

            <button
              onClick={() => onDelete(order._id)}
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold"
            >
              🗑 Delete
            </button>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}