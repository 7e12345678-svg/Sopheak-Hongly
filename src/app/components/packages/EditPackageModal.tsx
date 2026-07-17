"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Package {
  name: string;
  price: number;
}

interface Props {
  open: boolean;
  gameId: string;
  index: number | null;
  packageData: Package | null;
  onClose: () => void;
  refresh: () => Promise<void>;
}

export default function EditPackageModal({
  open,
  gameId,
  index,
  packageData,
  onClose,
  refresh,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (packageData) {
      setName(packageData.name);
      setPrice(packageData.price.toString());
    }
  }, [packageData]);

  if (!open) return null;

  const handleSave = async () => {
    console.log("Sending gameId:", gameId);
    if (!name.trim()) {
      toast.error("Package name is required");
      return;
    }

    if (Number(price) <= 0) {
      toast.error("Invalid price");
      return;
    }

    try {
        console.log("gameId =", gameId);
      console.log("gameId =", gameId);

const res = await fetch(`/api/packages/${String(gameId)}`, {
        
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index,
          name,
          price: Number(price),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Package updated");

        await refresh();

        onClose();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Edit Package
        </h2>

        <div className="space-y-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Package Name"
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-5 py-3 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-cyan-500 text-black font-bold px-5 py-3 hover:bg-cyan-400"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}