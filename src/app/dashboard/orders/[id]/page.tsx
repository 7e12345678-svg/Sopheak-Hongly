"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Order {
  _id: string;
  trackingCode: string;
  game: string;
  gameId: string;
  serverId: string;
  package: string;
  price: number;
  payment: string;
  status: string;
  screenshot?: string;
  createdAt: string;
}

function getStatusClass(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-400";
    case "Processing":
      return "bg-yellow-500/20 text-yellow-400";
    case "Pending":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-slate-500/20 text-slate-400";
  }
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);

        const res = await fetch(`/api/my-orders/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load order");
        }

        const data = await res.json();

        if (data.success) {
          setOrder(data.order);
        } else {
          setError(data.message || "Order not found");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="animate-pulse text-slate-400">
          Loading order...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
        {error}
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="mx-auto max-w-4xl p-6">

      <Link
        href="/dashboard/orders"
        className="mb-6 inline-flex items-center rounded-lg bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
      >
        ← Back to My Orders
      </Link>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold text-cyan-400">
          Order Details
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <Info label="Tracking" value={order.trackingCode} />
          <Info label="Game" value={order.game} />
          <Info label="Player ID" value={order.gameId} />
          <Info label="Server ID" value={order.serverId} />
          <Info label="Package" value={order.package} />
          <Info label="Price" value={`$${order.price}`} />
          <Info label="Payment" value={order.payment} />
          <Info
            label="Order Date"
            value={new Date(order.createdAt).toLocaleString()}
          />

          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">
              Status
            </p>

            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

        </div>

        {order.screenshot && (
          <div className="mt-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Payment Screenshot
            </h2>

            <Image
              src={order.screenshot}
              alt="Payment Screenshot"
              width={700}
              height={500}
              className="w-full rounded-xl border border-slate-700 object-cover"
            />

          </div>
        )}

      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}