"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import StatusBadge from "@/components/tracking/StatusBadge";

interface Order {
  trackingCode: string;
  game: string;
  playerName: string;
  serverId: string;
  package: string;
  price: number;
  payment: string;
  screenshot: string;
  status: string;
  createdAt: string;
}

export default function TrackPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  async function searchOrder() {
    if (!trackingCode.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/track/${trackingCode}`);

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#050816] py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-white">
            Track Your Order
          </h1>

          <p className="mt-4 text-slate-400">
            Enter your tracking code to check your order status.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 flex gap-4">
          <input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="GT123456789"
            className="flex-1 rounded-xl border border-cyan-500/20 bg-white/5 px-5 py-4 text-white outline-none"
          />

          <button
            onClick={searchOrder}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 font-bold text-black hover:bg-cyan-400"
          >
            <Search size={18} />
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Order Details
                </h2>

                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong>Tracking:</strong>{" "}
                    {order.trackingCode}
                  </p>

                  <p>
                    <strong>Game:</strong>{" "}
                    {order.game}
                  </p>

                  <p>
                    <strong>Player:</strong>{" "}
                    {order.playerName}
                  </p>

                  <p>
                    <strong>Server:</strong>{" "}
                    {order.serverId}
                  </p>

                  <p>
                    <strong>Package:</strong>{" "}
                    {order.package}
                  </p>

                  <p>
                    <strong>Price:</strong> $
                    {order.price}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.payment}
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>

                  <div className="pt-4">
                    <StatusBadge
                      status={order.status}
                    />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Payment Screenshot
                </h2>

                {order.screenshot ? (
                  <Image
                    src={order.screenshot}
                    alt="Receipt"
                    width={500}
                    height={500}
                    className="rounded-2xl border border-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/10 text-slate-500">
                    No Screenshot
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-10">
              <h3 className="mb-6 text-xl font-bold text-white">
                Progress
              </h3>

              <div className="flex items-center justify-between">
                {["Pending", "Processing", "Completed"].map(
                  (step, index) => {
                    const steps = [
                      "Pending",
                      "Processing",
                      "Completed",
                    ];

                    const active =
                      steps.indexOf(order.status) >= index;

                    return (
                      <div
                        key={step}
                        className="flex flex-1 flex-col items-center"
                      >
                        <div
                          className={`h-6 w-6 rounded-full ${
                            active
                              ? "bg-cyan-400"
                              : "bg-slate-600"
                          }`}
                        />

                        <p className="mt-3 text-sm text-white">
                          {step}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}