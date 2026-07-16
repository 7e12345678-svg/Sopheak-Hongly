"use client";

import Image from "next/image";
import type { Order } from "@/hooks/useOrders";

interface Props {
  payments: Order[];
}

interface Payment {
  _id: string;
  playerName: string;
  game: string;
  payment: string;
  price: number;
  screenshot?: string;
  status: string;
}



export default function PaymentTable({
  payments,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4 text-left">Player</th>
            <th className="p-4 text-left">Game</th>
            <th className="p-4 text-left">Payment</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-center">Screenshot</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment._id}
              className="border-t border-slate-700"
            >
              <td className="p-4">{payment.playerName}</td>

              <td className="p-4">{payment.game}</td>

              <td className="p-4">{payment.payment}</td>

              <td className="p-4">${payment.price}</td>

              <td className="p-4 text-center">
                {payment.screenshot ? (
                  <Image
                    src={payment.screenshot}
                    alt="payment"
                    width={70}
                    height={70}
                    className="mx-auto rounded-lg"
                  />
                ) : (
                  "-"
                )}
              </td>

              <td className="p-4 text-center">
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}