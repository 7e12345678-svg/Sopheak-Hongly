"use client";

import { InputHTMLAttributes } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        px-4
        py-3
        text-white
        outline-none
        focus:border-cyan-400
        ${className}
      `}
    />
  );
}