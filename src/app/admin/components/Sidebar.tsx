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
} from "lucide-react";

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

<Link
  href="/admin/customers"
  className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black"
>
  👥 Customers
</Link>

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      hidden
      h-screen
      w-72
      flex-col
      border-r
      border-slate-800
      bg-[#0B1120]
      lg:flex
    "
    >
      <div className="p-6">
  <h1 className="text-3xl font-bold text-cyan-400">
    Z-Store
  </h1>

  <p className="text-slate-400">
    Admin Panel
  </p>
</div>

      <nav className="flex-1 space-y-2 p-5">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`
                flex
                items-center
                gap-4
                rounded-2xl
                px-5
                py-4
                transition
                ${
                  active
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-300 hover:bg-slate-800"
                }
              `}
            >
              <Icon size={22} />

              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <button
  onClick={async () => {
    await fetch("/api/admin-logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }}
  className="
    flex
    w-full
    items-center
    gap-4
    rounded-2xl
    bg-red-600
    px-5
    py-4
    font-bold
    transition
    hover:bg-red-500
  "
>
  <LogOut size={22} />
  Logout
</button>
      </div>
    </aside>
  );
}