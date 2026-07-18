interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400",
    Processing: "bg-blue-500/20 text-blue-400",
    Completed: "bg-green-500/20 text-green-400",
    Cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        styles[status] || "bg-gray-500/20 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}