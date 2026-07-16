"use client";

import { paymentMethods } from "@/app/data/paymentMethods";

export default function PaymentMethods() {
  return (
    <div className="mt-12 w-full">
      <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
        Trusted Payment Methods
      </p>

      <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
        {paymentMethods.map((payment) => (
          <div
            key={payment.name}
            className="
              flex
              h-16
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-700
              bg-slate-900/60
              backdrop-blur-xl
              transition
              hover:-translate-y-1
              hover:border-cyan-400
              hover:shadow-lg
              hover:shadow-cyan-500/20
            "
          >
            <img
              src={payment.image}
              alt={payment.name}
              className="max-h-8 lg:max-h-10 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}