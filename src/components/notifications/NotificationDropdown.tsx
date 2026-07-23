"use client";

import { Notification } from "@/types/notification";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: Notification[];
}

export default function NotificationDropdown({
  notifications,
}: Props) {
  return (
    <div
      className="
        absolute
        right-0
        mt-3
        w-80
        bg-slate-900
        rounded-xl
        shadow-xl
        border
        border-slate-700
        overflow-hidden
      "
    >
      {notifications.length === 0 ? (
        <div className="p-5 text-center">
          No Notifications
        </div>
      ) : (
        notifications.map((item) => (
  <NotificationItem
    key={item.id}
    avatar={item.avatar}
    name={item.name}
    game={item.game}
    item={item.item}
    time={item.time}
  />
))
      )}
    </div>
  );
}