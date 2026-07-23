"use client";

import { useEffect, useState } from "react";

export type Notification = {
  id: string;
  avatar: string;
  name: string;
  game: string;
  item: string;
  time: string;
};

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notifications", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    }

    load();

    const interval = setInterval(load, 30000);

    return () => clearInterval(interval);
  }, []);

  return notifications;
}