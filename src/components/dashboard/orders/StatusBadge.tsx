"use client";

interface StatusBadgeProps {
  status: string;
}

const styles: Record<
  string,
  {
    bg: string;
    text: string;
    dot: string;
  }
> = {
  Pending: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
  },
  Processing: {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    dot: "bg-sky-400",
  },
  Completed: {
    bg: "bg-green-500/15",
    text: "text-green-400",
    dot: "bg-green-400",
  },
  Cancelled: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    dot: "bg-red-400",
  },
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const style =
    styles[status] ?? styles.Pending;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${style.dot}`}
      />
      {status}
    </span>
  );
}