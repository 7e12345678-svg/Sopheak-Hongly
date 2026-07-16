export async function getNotifications() {
  const res = await fetch("/api/notifications", {
    cache: "no-store",
  });

  return res.json();
}
