"use client";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
      <div className="mb-4 text-5xl">📦</div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {description}
      </p>
    </div>
  );
}