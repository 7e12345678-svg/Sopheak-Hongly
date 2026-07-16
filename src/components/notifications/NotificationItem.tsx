"use client";

import { Notification } from "@/types/notification";

interface Props {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: Props) {
  return (
    <div
      className="
      p-3
      border-b
      border-slate-700
      hover:bg-slate-800
    "
    >
      <h3 className="font-bold">
        {notification.title}
      </h3>

      <p className="text-sm text-gray-400">
        {notification.message}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        {new Date(
          notification.createdAt
        ).toLocaleString()}
      </p>
    </div>
  );
}