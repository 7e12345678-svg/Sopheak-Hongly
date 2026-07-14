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

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (data.success) {
        await fetchOrders();

        if (selectedOrder?._id === id) {
          setSelectedOrder(data.order);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    } catch (error) {
      console.error(error);
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