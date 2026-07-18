"use client";

import { useEffect, useState } from "react";
import {
  getPaymentMethods,
  PaymentMethod,
} from "@/services/paymentMethods";

export default function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPaymentMethods();

        setMethods(data);
      } catch (error) {
        console.error("Failed to load payment methods:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    methods,
    loading,
  };
}