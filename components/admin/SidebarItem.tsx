"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarItemProps {
  href: string;
  icon: IconType;
  title: string;
}

export default function SidebarItem({
  href,
  icon: Icon,
  title,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
      ${
        active
          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-cyan-400"
      }`}
    >
      <Icon className="text-xl" />

      <span className="font-medium">
        {title}
      </span>
    </Link>
  );
}