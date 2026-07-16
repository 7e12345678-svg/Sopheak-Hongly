"use client";

import type { Customer } from "@/types";

interface Props {
  customers: Customer[];
}

export default function CustomerStats({
  customers,
}: Props) {
  const totalCustomers = customers.length;

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.totalOrders,
    0
  );

  const topCustomer =
    customers.length > 0
      ? customers.reduce((current, next) =>
          current.totalSpent > next.totalSpent
            ? current
            : next
        )
      : null;

  const cards = [
    {
      title: "Customers",
      value: totalCustomers,
    },
    {
      title: "Orders",
      value: totalOrders,
    },
    {
      title: "Revenue",
      value: `$${totalSpent}`,
    },
    {
      title: "Top Customer",
      value: topCustomer?.playerName ?? "-",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-700 bg-[#111827] p-6"
        >
          <p className="text-gray-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-cyan-400">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}