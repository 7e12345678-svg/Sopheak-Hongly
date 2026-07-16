"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-700
        bg-slate-900
        p-6
        shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}