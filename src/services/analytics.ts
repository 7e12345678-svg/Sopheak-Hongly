export async function getAnalytics() {
  const res = await fetch("/api/analytics", {
    cache: "no-store",
  });

  return res.json();
}