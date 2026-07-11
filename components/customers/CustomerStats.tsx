"use client";

interface Customer {
  phone: string;
  playerName: string;
  totalOrders: number;
  totalSpent: number;
  favoriteGame: string;
  lastOrder: string;
}

interface Props {
  customers: Customer[];
}

export default function CustomerStats({
  customers,
}: Props) {
  const totalCustomers = customers.length;

  const totalSpent = customers.reduce(
    (sum, c) => sum + c.totalSpent,
    0
  );

  const totalOrders = customers.reduce(
    (sum, c) => sum + c.totalOrders,
    0
  );

  const topCustomer =
    customers.length > 0
      ? customers.reduce((a, b) =>
          a.totalSpent > b.totalSpent ? a : b
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
      value: topCustomer
        ? topCustomer.playerName
        : "-",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#111827] border border-slate-700 rounded-2xl p-6"
        >
          <p className="text-gray-400">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-3 text-cyan-400">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}