import { Order } from "@/hooks/useOrders";

// ===============================
// Admin Orders
// ===============================
export async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders", {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    console.error("HTTP Error:", res.status);
    return [];
  }

  const data = await res.json();

  return data.success ? data.orders : [];
}

// ===============================
// Homepage Live Orders
// ===============================
export async function getLiveOrders() {
  const res = await fetch("/api/orders/live", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("HTTP Error:", res.status);
    return [];
  }

  const data = await res.json();

  return data.success ? data.orders : [];
}

// ===============================
// Update Order
// ===============================
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

// ===============================
// Delete Order
// ===============================
export async function deleteOrder(id: string) {
  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

// ===============================
// Create Order
// ===============================
export async function createOrder(form: FormData) {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: form,
  });

  return res.json();
}