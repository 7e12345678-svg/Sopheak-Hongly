import { Order } from "@/hooks/useOrders";

export async function getPayments(): Promise<Order[]> {
  const res = await fetch("/api/orders", {
    cache: "no-store",
  });

  const data = await res.json();

  if (!data.success) {
    return [];
  }

  return data.orders;
}