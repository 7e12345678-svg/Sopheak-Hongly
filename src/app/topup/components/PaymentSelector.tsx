"use client";

import Image from "next/image";

const paymentLogos = {
  ABA: "/images/aba.jpg",
  Wing: "/images/wing.jpg",
  ACLEDA: "/images/acleda.jpg",
  AMK: "/images/amk.jpg",
};

interface Props {
  payment: string;
  setPayment: (value: string) => void;
  loading: boolean;
}

export default function PaymentSelector({
  payment,
  setPayment,
  loading,
}: Props) {
  return (
    <div className="mb-8">
      <label className="mb-4 block text-lg font-bold text-cyan-400">
        💳 Payment Method
      </label>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.keys(paymentLogos).map((method) => (
          <button
            key={method}
            type="button"
            disabled={loading}
            onClick={() => setPayment(method)}
            className={`rounded-xl border-2 p-4 transition ${
              payment === method
                ? "border-cyan-300 bg-cyan-500 text-black"
                : "border-slate-700 bg-slate-800 hover:border-cyan-400"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src={paymentLogos[method as keyof typeof paymentLogos]}
                alt={method}
                width={50}
                height={50}
              />

              <span className="font-semibold">
                {method}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}