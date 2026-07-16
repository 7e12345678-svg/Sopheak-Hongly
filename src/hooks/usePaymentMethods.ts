"use client";

import { useEffect, useState } from "react";
import { getPaymentMethods } from "@/services/paymentMethods";

export interface PaymentMethod {
  _id: string;
  name: string;
  logo: string;
  qr: string;
  accountName: string;
  accountNumber: string;
  enabled: boolean;
}

export default function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPaymentMethods();

      if (data.success) {
        setMethods(data.methods);
      }

      setLoading(false);
    }

    load();
  }, []);

  return {
    methods,
    loading,
  };
}