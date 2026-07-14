"use client";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PackageActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">

      {/* Edit */}
      <button
        onClick={onEdit}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
        title="Edit Package"
      >
        ✏️
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400 transition hover:bg-red-500 hover:text-white"
        title="Delete Package"
      >
        🗑️
      </button>

    </div>
  );
}