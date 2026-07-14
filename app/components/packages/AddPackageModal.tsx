"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  gameId: string;
  gameName: string;
  onClose: () => void;
  refresh: () => void;
}

export default function AddPackageModal({
  open,
  gameId,
  gameName,
  onClose,
  refresh,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name || !price) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId,
          name,
          price: Number(price),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed");
        return;
      }

      toast.success("Package Added");

      setName("");
      setPrice("");

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Add Package
        </h2>

        <p className="mb-4 text-slate-400">
          {gameName}
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Package Name"
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 mb-4 outline-none"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
        />

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-slate-700 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}