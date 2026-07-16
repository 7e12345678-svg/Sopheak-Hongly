interface Props {
  customer: string;
  total: number;
}

export default function TopCustomerCard({
  customer,
  total,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-yellow-500 p-8 hover:border-yellow-400 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">
            👑 Top Customer
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-3">
            {customer}
          </h2>

          <p className="text-gray-500 mt-2">
            {total} Orders
          </p>

          <p className="text-cyan-400 font-bold mt-3">
            🏅 VIP Customer
          </p>
        </div>

        <div className="text-6xl">
          👑
        </div>
      </div>
    </div>
  );
}