"use client";

import RevenueChart from "./RevenueChart";
import PaymentChart from "./PaymentChart";
import GameChart from "./GameChart";
import RecentActivity from "./RecentActivity";
import TopCustomerCard from "./TopCustomerCard";

interface Order {
  _id: string;
  game: string;
  playerName: string;
  gameId: string;
  serverId: string;
  package: string;
  payment: string;
  phone: string;
  screenshot?: string;
  status: string;
  createdAt: string;
  price: number;
}

interface Props {
  orders: Order[];
  topCustomer: [string, number];
}

export default function ChartsSection({
  orders,
  topCustomer,
}: Props) {
  return (
    <>
      {/* Row 1 */}
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart orders={orders} />
        </div>

        <div>
          <PaymentChart orders={orders} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GameChart orders={orders} />

        <TopCustomerCard
          customer={topCustomer?.[0] ?? "-"}
          total={topCustomer?.[1] ?? 0}
        />
      </div>

      {/* Row 3 */}
      <RecentActivity />
    </>
  );
}