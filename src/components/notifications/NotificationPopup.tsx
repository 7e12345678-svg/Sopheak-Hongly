"use client";

import { AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import useNotification from "./useNotification";

export default function NotificationPopup() {
  const { current, visible } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-[340px] max-w-[calc(100vw-2rem)]">
      <AnimatePresence mode="wait">
        {visible && current && (
          <NotificationItem
            key={`${current.name}-${current.time}`}
            avatar={current.avatar}
            name={current.name}
            game={current.game}
            item={current.item}
            time={current.time}
          />
        )}
      </AnimatePresence>
    </div>
  );
}