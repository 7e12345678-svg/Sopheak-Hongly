export interface PaymentMethod {
  _id: string;
  name: string;
  logo: string;
  qr: string;
  accountName: string;
  accountNumber: string;
  enabled: boolean;
}

// =========================
// Get
// =========================
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const res = await fetch("/api/payment-methods", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data.success ? data.methods : [];
}

// =========================
// Create
// =========================
export async function createPaymentMethod(
  method: Partial<PaymentMethod>
) {
  const res = await fetch("/api/payment-methods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(method),
  });

  return res.json();
}

// =========================
// Update
// =========================
export async function updatePaymentMethod(
  id: string,
  form: FormData
) {
  const res = await fetch(`/api/payment-methods/${id}`, {
    method: "PUT",
    body: form,
  });

  return res.json();
}

// =========================
// Delete
// =========================
export async function deletePaymentMethod(
  id: string
) {
  const res = await fetch(`/api/payment-methods/${id}`, {
    method: "DELETE",
  });

  return res.json();
}