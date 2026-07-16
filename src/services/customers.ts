import type { Customer } from "@/types/customer";

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch("/api/customers", {
    cache: "no-store",
  });

  const data = await res.json();

  if (!data.success) {
    return [];
  }

  return data.customers;
}