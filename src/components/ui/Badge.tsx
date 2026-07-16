"use client";

interface Props {
  text: string;
}

export default function Badge({
  text,
}: Props) {
  return (
    <span
      className="
      rounded-full
      bg-cyan-500/20
      px-3
      py-1
      text-xs
      font-bold
      text-cyan-400
    "
    >
      {text}
    </span>
  );
}