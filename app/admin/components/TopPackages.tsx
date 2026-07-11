interface Order {
  package: string;
}

interface Props {
  orders: Order[];
}

export default function TopPackages({ orders }: Props) {
  const packageCount: Record<string, number> = {};

  orders.forEach((order) => {
    packageCount[order.package] =
      (packageCount[order.package] || 0) + 1;
  });

  const topPackages = Object.entries(packageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📦 Top Packages
      </h2>

      <div className="space-y-4">
        {topPackages.length === 0 ? (
          <p className="text-gray-400">
            No package data.
          </p>
        ) : (
          topPackages.map(([pkg, total], index) => (
            <div
              key={pkg}
              className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
            >
              <div>
                <p className="text-white font-bold">
                  #{index + 1} {pkg}
                </p>

                <p className="text-gray-400 text-sm">
                  {total} Orders
                </p>
              </div>

              <span className="text-cyan-400 font-bold">
                🔥
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}