"use client";

import { useEffect, useState } from "react";
import { Order } from "./useOrders";
import { getPayments } from "@/services/payments";

export default function usePayments() {
  const [payments, setPayments] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setPayments(await getPayments());
      setLoading(false);
    };

    load();
  }, []);

  return {
    payments,
    loading,
  };
}