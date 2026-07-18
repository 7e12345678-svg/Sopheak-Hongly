"use client";

import { useState } from "react";
import { TicketPercent } from "lucide-react";

interface Props {
  onApply: (discount: number, code: string) => void;
}

export default function PromoCode({ onApply }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function applyPromo() {
    if (!code.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      onApply(data.discount, code);

      alert("Promo Applied Successfully 🎉");
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-5">
      <div className="flex items-center gap-2 text-cyan-400">
        <TicketPercent size={20} />
        <span className="font-bold">Promo Code</span>
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter promo code"
          className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
        />

        <button
          onClick={applyPromo}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-5 font-bold text-black hover:bg-cyan-400"
        >
          {loading ? "Checking..." : "Apply"}
        </button>
      </div>
    </div>
  );
}