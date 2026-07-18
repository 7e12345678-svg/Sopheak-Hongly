"use client";

import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import type { Order } from "../../../hooks/useOrders";

import {
  X,
  CheckCircle,
  Trash2,
  Copy,
  Smartphone,
  Gamepad2,
  Calendar,
  CreditCard,
  User,
  Package,
  HardDrive,
} from "lucide-react";

interface Props {
  order: Order | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
  onZoom: () => void;
}

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  copyValue?: string;
}

function InfoCard({
  icon,
  title,
  value,
  copyValue,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}

          <div>
            <p className="text-xs text-slate-400">
              {title}
            </p>

            <p className="break-all font-semibold text-white">
              {value}
            </p>
          </div>
        </div>

        {copyValue && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(copyValue);
              toast.success(`${title} copied`);
            }}
            className="rounded-lg bg-cyan-500/20 p-2 transition hover:bg-cyan-500 hover:text-white"
          >
            <Copy size={16} />
          </button>
        )}
      </div>
    </div>
  );
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
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [order, onClose]);

  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          transition={{
            duration: 0.25,
          }}
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
        >
          {/* Header */}

          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-cyan-400">
              Order Details
            </h2>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}

          <div className="grid gap-8 md:grid-cols-2">

            {/* LEFT COLUMN */}
            <div className="space-y-4">{/* Game */}
<InfoCard
  icon={<Gamepad2 className="text-cyan-400" size={18} />}
  title="Game"
  value={order.game}
/>

{/* Player */}
<InfoCard
  icon={<User className="text-cyan-400" size={18} />}
  title="Player"
  value={order.playerName}
/>

{/* Game ID */}
<InfoCard
  icon={<Gamepad2 className="text-cyan-400" size={18} />}
  title="Game ID"
  value={order.gameId}
  copyValue={order.gameId}
/>

{/* Server */}
<InfoCard
  icon={<HardDrive className="text-cyan-400" size={18} />}
  title="Server"
  value={order.serverId}
/>

{/* Package */}
<InfoCard
  icon={<Package className="text-cyan-400" size={18} />}
  title="Package"
  value={order.package}
/>

{/* Payment */}
<InfoCard
  icon={<CreditCard className="text-cyan-400" size={18} />}
  title="Payment"
  value={order.payment}
/>

{/* Phone */}
<InfoCard
  icon={<Smartphone className="text-cyan-400" size={18} />}
  title="Phone"
  value={order.phone}
  copyValue={order.phone}
/>

{/* Date */}
<InfoCard
  icon={<Calendar className="text-cyan-400" size={18} />}
  title="Date"
  value={new Date(order.createdAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
/>

{/* Status */}
<div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
  <p className="mb-2 text-xs text-slate-400">
    Status
  </p>

  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
      order.status === "Completed"
        ? "bg-green-500/20 text-green-400"
        : "bg-yellow-500/20 text-yellow-400"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full ${
        order.status === "Completed"
          ? "bg-green-400"
          : "bg-yellow-400"
      }`}
    />

    {order.status}
  </span>
</div>

{/* END LEFT COLUMN */}
</div>

{/* RIGHT COLUMN */}
<div className="flex items-center justify-center">

  {order.screenshot ? (

    <Image
      src={order.screenshot}
      alt="Payment Screenshot"
      width={380}
      height={380}
      onClick={onZoom}
      className="
        h-[360px]
        w-full
        max-w-[380px]
        cursor-zoom-in
        rounded-2xl
        border
        border-slate-700
        object-cover
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:border-cyan-500
        hover:shadow-2xl
        hover:shadow-cyan-500/20
      "
    />

  ) : (

    <div className="flex h-[360px] w-full max-w-[380px] items-center justify-center rounded-2xl border border-dashed border-slate-700 text-slate-500">

      No Screenshot

    </div>

  )}

</div>

{/* END BODY */}
</div>

{/* Footer */}
<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
    <button
    onClick={() => onDelete(order._id)}
    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500"
  >
    <Trash2 size={18} />
    Delete
  </button>

  <button
    disabled={order.status === "Completed"}
    onClick={() => onConfirm(order._id)}
    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold transition hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-slate-700"
  >
    <CheckCircle size={18} />
    {order.status === "Completed"
      ? "Confirmed"
      : "Confirm"}
  </button>

  <button
    onClick={onClose}
    className="flex items-center justify-center gap-2 rounded-xl bg-slate-700 py-3 font-semibold transition hover:bg-slate-600"
  >
    <X size={18} />
    Close
  </button>

</div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
