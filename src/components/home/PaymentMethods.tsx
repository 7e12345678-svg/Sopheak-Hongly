"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getPaymentMethods,
  PaymentMethod,
} from "@/services/paymentMethods";

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPaymentMethods();
        setMethods(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">
            Payment Methods
          </h2>

          <p className="mt-2 text-slate-400">
            Fast, secure and trusted payment options.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-slate-900"
              />
            ))}
          </div>
        ) : methods.length === 0 ? (
          <div className="rounded-xl bg-slate-900 p-10 text-center text-slate-400">
            No payment methods available.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((method) => (
              <div
                key={method._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
              >
                <div className="relative mx-auto h-16 w-16">
                  <Image
                    src={method.logo}
                    alt={method.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-4 text-center text-lg font-semibold text-white">
                  {method.name}
                </h3>

                <p className="mt-2 text-center text-sm text-slate-400">
                  {method.accountName}
                </p>

                <p className="text-center text-cyan-400">
                  {method.accountNumber}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}