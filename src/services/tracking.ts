export async function getOrderByTrackingCode(code: string) {
  const res = await fetch(`/api/track/${code}`, {
    cache: "no-store",
  });

  return res.json();
}