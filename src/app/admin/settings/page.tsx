"use client";

import usePaymentMethods from "@/hooks/usePaymentMethods";
import PaymentMethodCard from "@/components/settings/PaymentMethodCard";

export default function SettingsPage() {
  const { methods, loading } = usePaymentMethods();

  return (
    <main className="min-h-screen bg-[#070b1d] p-8 text-white">
      <h1 className="mb-2 text-4xl font-bold text-cyan-400">
        ⚙️ Settings
      </h1>

      <p className="mb-8 text-slate-400">
        Manage payment methods and store settings.
      </p>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6">
  {methods.map((method) => (
    <PaymentMethodCard
      key={method._id}
      method={method}
    />
  ))}
</div>
        )}
      </div>
    </main>
  );
}