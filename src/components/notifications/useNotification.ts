"use client";

import { useEffect, useState } from "react";
import useNotifications, { Notification } from "@/hooks/useNotifications";

export default function useNotification() {
  const notifications = useNotifications();

  const [current, setCurrent] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notifications.length) return;

    // Show only the newest notification
    setCurrent(notifications[0]);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  return {
    current,
    visible,
  };
}