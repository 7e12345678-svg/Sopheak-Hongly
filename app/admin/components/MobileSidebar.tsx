"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gamepad2,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Games",
    href: "/admin/games",
    icon: Gamepad2,
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function MobileSidebar({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 lg:hidden"
      />

      {/* Drawer */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          bg-[#0B1120]
          border-r
          border-slate-800
          lg:hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">
              Z-Store
            </h1>

            <p className="text-slate-400">
              Admin Panel
            </p>
          </div>

          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 p-5">
          {menus.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition
                  ${
                    active
                      ? "bg-cyan-500 text-black font-bold"
                      : "text-white hover:bg-slate-800"
                  }
                `}
              >
                <Icon size={20} />

                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
<div className="border-t border-slate-800 p-5">
  <button
    onClick={async () => {
      await fetch("/api/admin-logout", {
        method: "POST",
      });

      onClose();

      router.push("/admin/login");
      router.refresh();
    }}
    className="
      flex
      w-full
      items-center
      gap-4
      rounded-xl
      bg-red-600
      px-4
      py-3
      font-bold
      transition
      hover:bg-red-500
    "
  >
    <LogOut size={20} />
    Logout
  </button>
</div>
      </aside>
    </>
  );
}