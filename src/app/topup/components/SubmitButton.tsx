"use client";

interface Props {
  loading: boolean;
  onSubmit: () => void;
}

export default function SubmitButton({
  loading,
  onSubmit,
}: Props) {
  return (
    <button
      onClick={onSubmit}
      disabled={loading}
      className={`w-full rounded-xl py-4 text-lg font-bold ${
        loading
          ? "cursor-not-allowed bg-gray-500"
          : "bg-gradient-to-r from-cyan-500 to-blue-600"
      }`}
    >
      {loading
        ? "Submitting..."
        : "Submit Order"}
    </button>
  );
}