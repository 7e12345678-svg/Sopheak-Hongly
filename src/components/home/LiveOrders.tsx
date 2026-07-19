"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock3 } from "lucide-react";

interface Order {
  _id: string;
  playerName: string;
  game: string;
  package: string;
  status: string;
  image: string;
  createdAt: string;
}

function getGameImage(game: string) {
  const name = game.toLowerCase().trim();


  // PUBG
  if (name.includes("pubg")) {
    return "/images/pubg.jpg";
  }


  // Free Fire
  if (
    name.includes("free") ||
    name.includes("fire") ||
    name === "ff"
  ) {
    return "/images/freefire.jpg";
  }


  // Roblox
  if (name.includes("roblox")) {
    return "/images/roblox.jpg";
  }


  // Mobile Legends
  if (
    name.includes("legend") ||
    name.includes("mlbb") ||
    name.includes("mobile legend")
  ) {
    return "/images/mlbb.jpg";
  }


  return "/images/default-game.jpg";
}

export default function LiveOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    try {
      const res = await fetch("/api/live-orders", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadOrders();

    const interval = setInterval(loadOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime();

    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;

    const hrs = Math.floor(mins / 60);

    if (hrs < 24) return `${hrs} hrs ago`;

    return `${Math.floor(hrs / 24)} days ago`;
  }

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-green-400">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-400" />

            LIVE TOP UPS

          </div>

          <h2 className="mt-6 text-5xl font-black text-white">
            Recent Orders
          </h2>

          <p className="mt-4 text-slate-400">
            Real-time customer purchases
          </p>

        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">

          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .1,
              }}
              className="
                rounded-3xl
                border
                border-cyan-500/20
                bg-white/5
                backdrop-blur-xl
                p-5
              "
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                  <Image
  src={getGameImage(order.game)}
  alt={order.game}
  width={70}
  height={70}
  className="rounded-2xl object-cover"
/>

                  <div>

                    <h3 className="font-bold text-xl text-white">
                      {order.playerName}
                    </h3>

                    <p className="text-cyan-400">
                      {order.game}
                    </p>

                    <p className="text-slate-400">
                      {order.package}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400 text-sm font-bold">
                    {order.status}
                  </span>

                  <div className="mt-3 flex items-center justify-end gap-2 text-slate-400">

                    <Clock3 size={16} />

                    {timeAgo(order.createdAt)}

                  </div>

                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}