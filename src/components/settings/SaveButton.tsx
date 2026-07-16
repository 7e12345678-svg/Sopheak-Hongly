"use client";

interface Props {
  loading: boolean;
  onClick: () => void;
}

export default function SaveButton({
  loading,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        w-full
        rounded-xl
        bg-cyan-500
        py-3
        font-bold
        text-black
        transition
        hover:bg-cyan-400
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading ? "Saving..." : "💾 Save Changes"}
    </button>
  );
}