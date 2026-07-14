"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

export default function AddGameModal({
  open,
  onClose,
  refresh,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState(true);

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
    );
  }, [name]);

  if (!open) return null;

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setFeatured(false);
    setStatus(true);
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Game name is required");
      return;
    }

    if (!image) {
      toast.error("Please choose an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("featured", String(featured));
      formData.append("status", String(status));
      formData.append("sortOrder", "0");
      formData.append("image", image);

      const res = await fetch("/api/games", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Game Added Successfully");

      refresh();

      resetForm();

      onClose();
    } catch (err) {
      console.error(err);

      toast.error("Failed to add game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#0f172a] w-full max-w-xl rounded-2xl border border-cyan-700 p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-cyan-400">
            Add New Game
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

          <div>

            <label className="block mb-2">
              Game Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-slate-800 rounded-xl px-4 py-3 outline-none border border-slate-700"
            />

          </div>

          <div>

            <label className="block mb-2">
              Slug
            </label>

            <input
              value={slug}
              readOnly
              className="w-full bg-slate-900 rounded-xl px-4 py-3 border border-slate-700"
            />

          </div>

          <div>

            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-slate-800 rounded-xl px-4 py-3 outline-none border border-slate-700"
            />

          </div>

          <div>

            <label className="block mb-2">
              Game Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files?.[0] || null
                )
              }
              className="w-full"
            />

          </div>

          <div className="flex items-center justify-between">

            <label className="flex gap-2 items-center">

              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(e.target.checked)
                }
              />

              Featured

            </label>

            <label className="flex gap-2 items-center">

              <input
                type="checkbox"
                checked={status}
                onChange={(e) =>
                  setStatus(e.target.checked)
                }
              />

              Active

            </label>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-700"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
          >
            {loading ? "Saving..." : "Save Game"}
          </button>

        </div>

      </div>

    </div>
  );
}