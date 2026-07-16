"use client";

import { useEffect, useState } from "react";
import type { Customer } from "@/types/customer";
import { getCustomers } from "@/services/customers";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const load = async () => {
      setCustomers(await getCustomers());
    };

    load();
  }, []);

  return {
    customers,
  };
}