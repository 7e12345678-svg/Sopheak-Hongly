"use client";

import { useEffect, useState } from "react";

export interface Order {
  _id: string;
  trackingCode: string;
  game: string;
  package: string;
  payment: string;
  status: string;
  price: number;
  createdAt: string;
}

export function useMyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    const res = await fetch("/api/my-orders", {
      cache: "no-store",
    });

    const data = await res.json();

    if (data.success) {
      setOrders(data.orders);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOrders();

    const interval = setInterval(loadOrders, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    orders,
    loading,
  };
}