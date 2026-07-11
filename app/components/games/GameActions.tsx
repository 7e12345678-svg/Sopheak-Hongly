"use client";

import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function GameActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-2">

      <button
        onClick={onEdit}
        className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 transition"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500 transition"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}