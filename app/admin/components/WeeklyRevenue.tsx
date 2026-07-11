"use client";

interface Order {
  createdAt: string;
  package: string;
  status: string;
}

interface Props {
  orders: Order[];
}

export default function WeeklyRevenue({ orders }: Props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const revenue = new Array(7).fill(0);

  orders.forEach((order) => {
    if (order.status !== "Completed") return;

    const date = new Date(order.createdAt);

    const day = date.getDay();

    const price = parseFloat(
      order.package.replace(/[^\d.]/g, "")
    );

    revenue[day] += isNaN(price) ? 0 : price;
  });

  const max = Math.max(...revenue, 1);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📈 Weekly Revenue
      </h2>

      <div className="space-y-4">
        {weekDays.map((day, index) => (
          <div key={day}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">{day}</span>

              <span className="text-cyan-400 font-bold">
                ${revenue[index]}
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(revenue[index] / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}