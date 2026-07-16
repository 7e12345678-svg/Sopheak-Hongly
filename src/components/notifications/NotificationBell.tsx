"use client";

interface Props {
  count: number;
  onClick: () => void;
}

export default function NotificationBell({
  count,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="relative"
    >
      🔔

      {count > 0 && (
        <span
          className="
          absolute
          -top-2
          -right-2
          bg-red-500
          rounded-full
          text-xs
          px-2
          py-0.5
        "
        >
          {count}
        </span>
      )}
    </button>
  );
}