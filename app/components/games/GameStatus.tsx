"use client";

interface Props {
  status: boolean;
}

export default function GameStatus({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
        status
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-red-500/20 text-red-400 border border-red-500/30"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          status ? "bg-green-400" : "bg-red-400"
        }`}
      />

      {status ? "Active" : "Hidden"}
    </span>
  );
}