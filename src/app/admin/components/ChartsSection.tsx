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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        <div className="lg:col-span-2">
          <RevenueChart orders={orders} />
        </div>

        <div>
          <PaymentChart orders={orders} />
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        <GameChart orders={orders} />

        <TopCustomerCard
          
  customer={String(topCustomer[0])}
  total={Number(topCustomer[1])}
/>

      </div>

      <RecentActivity />
    </>
  );
}