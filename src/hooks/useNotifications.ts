"use client";

import { useEffect, useState } from "react";
import type { Notification } from "@/types/notification";

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");

        const data = await res.json();

        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
  };
}