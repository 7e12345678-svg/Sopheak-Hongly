"use client";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { Users } from "lucide-react";

import {
  FaHome,
  FaGamepad,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0B1120] border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <Logo />

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        <SidebarItem
          href="/admin"
          icon={FaHome}
          title="Dashboard"
        />

        <SidebarItem
  href="/admin/games"
  icon={FaGamepad}
  title="Games"
/>

<SidebarItem
  href="/admin/packages"
  icon={FaBoxOpen}
  title="Packages"
/>

<SidebarItem
  href="/admin/orders"
  icon={FaShoppingCart}
  title="Orders"
/>

        <SidebarItem
          href="/admin/orders"
          icon={FaShoppingCart}
          title="Orders"
        />

        <SidebarItem
          href="/admin/customers"
          icon={FaUsers}
          title="Customers"
        />

        <SidebarItem
          href="/admin/payments"
          icon={FaMoneyBillWave}
          title="Payments"
        />

        <SidebarItem
          href="/admin/analytics"
          icon={FaChartBar}
          title="Analytics"
        />

        <SidebarItem
          href="/admin/settings"
          icon={FaCog}
          title="Settings"
        />

      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">

        <SidebarItem
          href="/admin/logout"
          icon={FaSignOutAlt}
          title="Logout"
        />

        

      </div>

      

    </aside>
  );
}