import { Order } from "@/hooks/useOrders";

export async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders", {
  cache: "no-store",
  credentials: "include",
});

  if (!res.ok) {
    console.error("HTTP Error:", res.status);
    return [];
  }

  const text = await res.text();

  console.log("Response:", text);

  if (!text) {
    console.error("Empty response");
    return [];
  }

  const data = JSON.parse(text);

  return data.success ? data.orders : [];
}

export async function updateOrder(
  id: string,
  status: string
) {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
}

export async function deleteOrder(
  id: string
) {
  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function createOrder(form: FormData) {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: form,
  });

  return res.json();
}