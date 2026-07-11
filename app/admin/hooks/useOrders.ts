"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export interface Order {
  _id: string;
  game: string;
  gameId: string;
  playerName: string;
  serverId: string;
  package: string;
  payment: string;
  phone: string;
  screenshot: string;
  status: string;
  createdAt: string;
}

export default function useOrders() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [lastOrderCount, setLastOrderCount] = useState(0);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      const newOrders: Order[] = data.orders || [];

      if (
        lastOrderCount > 0 &&
        newOrders.length > lastOrderCount
      ) {
        toast.success("🎉 New Top-Up Order!");

        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(console.error);
        }
      }

      setOrders(newOrders);
      setLastOrderCount(newOrders.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

    if (!res.ok) {
      toast.error(data.message || "Failed to update order");
      return;
    }

    toast.success("✅ Order Confirmed");

    fetchOrders();
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

  const deleteOrder = async (id: string) => {
  if (!confirm("Delete this order?")) return;

  try {
    const res = await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to delete order");
      return;
    }

    toast.success("🗑 Order Deleted");

    fetchOrders();
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

  return {
    audioRef,

    orders,
    loading,

    selectedOrder,
    setSelectedOrder,

    fetchOrders,
    updateStatus,
    deleteOrder,
  };
}