"use client";

interface Props {
  label: string;
  target: string;
  active: boolean;
  onClick: (target: string) => void;
}

export default function NavItem({
  label,
  target,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={() => onClick(target)}
      className={`
        group
        relative
        px-2
        py-2
        text-base
        font-semibold
        transition
        duration-300
        ${
          active
            ? "text-cyan-400"
            : "text-white hover:text-cyan-300"
        }
      `}
    >
      {label}

      <span
        className={`
          absolute
          left-0
          bottom-0
          h-[2px]
          bg-cyan-400
          transition-all
          duration-300
          ${
            active
              ? "w-full"
              : "w-0 group-hover:w-full"
          }
        `}
      />
    </button>
  );
}