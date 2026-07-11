"use client";

interface Order {
  _id: string;
  playerName: string;
  game: string;
  payment: string;
  package: string;
  status: string;
  createdAt: string;
}

interface Props {
  orders: Order[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="bg-[#11182d] rounded-2xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-cyan-400">
          Recent Orders
        </h2>

        <p className="text-gray-400 mt-1">
          Latest customer purchases
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#0b1020]">

            <tr>

              <th className="text-left p-4">Player</th>

              <th className="text-left p-4">Game</th>

              <th className="text-left p-4">Package</th>

              <th className="text-left p-4">Payment</th>

              <th className="text-left p-4">Status</th>

              <th className="text-left p-4">Date</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-t border-slate-700 hover:bg-slate-800 transition"
              >

                <td className="p-4 font-semibold">
                  {order.playerName}
                </td>

                <td className="p-4">
                  {order.game}
                </td>

                <td className="p-4">
                  {order.package}
                </td>

                <td className="p-4">
                  {order.payment}
                </td>

                <td className="p-4">

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>

                </td>

                <td className="p-4 text-gray-400">

                  {new Date(order.createdAt).toLocaleDateString()}

                </td>

              </tr>

            ))}

            {orders.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No Orders
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}