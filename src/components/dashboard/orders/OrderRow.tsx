"use client";

import Image from "next/image";

import { Order } from "@/hooks/useOrders";

import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import ActionButtons from "./ActionButtons";

function getGameImage(game: string) {
  console.log("GAME NAME:", game);

  const name = game.toLowerCase().trim();

  if (name.includes("pubg")) {
    console.log("PUBG IMAGE");
    return "/images/pubg.png";
  }

  if (
    name.includes("free fire") ||
    name === "ff"
  ) {
    console.log("FREE FIRE IMAGE");
    return "/images/freefire.png";
  }

  if (
    name.includes("mobile legend") ||
    name.includes("mobile legends") ||
    name.includes("mlbb")
  ) {
    console.log("MLBB IMAGE");
    return "/images/mlbb.png";
  }

  if (name.includes("roblox")) {
    console.log("ROBLOX IMAGE");
    return "/images/roblox.png";
  }


  console.log("DEFAULT IMAGE");
  return "/images/default-game.png";
}

interface Props {
  order: Order;
  onView: (order: Order) => void;
  onConfirm: (order: Order) => void;
  onDelete: (id: string) => void;
}

export default function OrderRow({
  order,
  onView,
  onConfirm,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-slate-800 transition hover:bg-slate-800/40">
      {/* Game */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <Image
  src={getGameImage(order.game)}
  alt={order.game}
  width={52}
  height={52}
  className="rounded-xl object-cover"
/>


          <div>
            <h3 className="font-semibold text-white">
              {order.game}
            </h3>

            <p className="text-sm text-slate-400">
              {order.package}
            </p>
          </div>
        </div>
      </td>

      {/* Player */}
      <td className="px-6 py-5">
        <div>
          <p className="font-semibold">
            {order.playerName}
          </p>

          <p className="text-sm text-slate-400">
            {order.phone}
          </p>
        </div>
      </td>

      {/* Payment */}
      <td className="px-6 py-5">
        <PaymentBadge payment={order.payment} />
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={order.status} />
      </td>

      {/* Action */}
      <td className="px-6 py-5">
        <ActionButtons
          order={order}
          onView={onView}
          onConfirm={onConfirm}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}