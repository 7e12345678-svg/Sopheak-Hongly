"use client";

import PaymentTable from "@/components/payments/PaymentTable";
import usePayments from "@/hooks/usePayments";

export default function PaymentsPage() {
  const { payments, loading } = usePayments();

  return (
    <main className="min-h-screen bg-[#070b1d] p-8 text-white">
      <h1 className="mb-2 text-4xl font-bold text-cyan-400">
        💳 Payment Management
      </h1>

      <p className="mb-8 text-slate-400">
        Verify customer payment screenshots.
      </p>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
        {loading ? (
          <p className="text-center">Loading payments...</p>
        ) : (
          <PaymentTable payments={payments} />
        )}
      </div>
    </main>
  );
}