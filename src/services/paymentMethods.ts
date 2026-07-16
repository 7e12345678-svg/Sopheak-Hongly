export async function getPaymentMethods() {
  const res = await fetch("/api/payment-methods", {
    cache: "no-store",
  });

  return res.json();
}

export async function updatePaymentMethod(
  id: string,
  form: FormData
) {
  const res = await fetch(
    `/api/payment-methods/${id}`,
    {
      method: "PUT",
      body: form,
    }
  );

  return res.json();
}