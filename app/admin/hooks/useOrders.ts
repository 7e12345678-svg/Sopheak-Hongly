"use client";

import { useEffect, useRef, useState } from "react";

export interface Order {
  _id: string;
  game: string;
  gameId: string;

  playerName: string;
  serverId: string;

  package: string;
  price: number;

  payment: string;
  phone: string;

  screenshot?: string;

  status: "Pending" | "Completed";

  createdAt: string;
}

export default function useOrders() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  // =============================
  // Fetch Orders
  // =============================
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =============================
  // Confirm Order
  // =============================
  const updateStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      const data = await res.json();

      if (data.success) {
        await fetchOrders();

        if (selectedOrder?._id === id) {
          setSelectedOrder(data.order);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // Delete Order
  // =============================
  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order?")) return;

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        await fetchOrders();

        if (selectedOrder?._id === id) {
          setSelectedOrder(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    audioRef,

    orders,

    selectedOrder,
    setSelectedOrder,

    fetchOrders,

    updateStatus,

    deleteOrder,
  };
}