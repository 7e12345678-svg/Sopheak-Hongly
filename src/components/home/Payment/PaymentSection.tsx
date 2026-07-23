"use client";
import PaymentMethods from "./PaymentMethods";

export default function PaymentSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white">
          Payment Methods
        </h2>

        <PaymentMethods />
      </div>
    </section>
  );
}