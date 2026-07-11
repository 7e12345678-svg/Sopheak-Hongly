"use client";

import { useState } from "react";
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

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  if (!open) return null;

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !slug ||
      !description ||
      !image
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append(
        "description",
        description
      );
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

      setName("");
      setSlug("");
      setDescription("");
      setImage(null);
      setPreview("");

      refresh();

      onClose();
    } catch (err) {
      console.error(err);

      toast.error("Failed to create game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="w-[550px] bg-[#121b31] rounded-2xl p-8">

        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Add New Game
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Game Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-[#0c1324] border border-cyan-700 rounded-xl px-5 py-3"
          />

          <input
            placeholder="Slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
            className="w-full bg-[#0c1324] border border-cyan-700 rounded-xl px-5 py-3"
          />

          <textarea
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-[#0c1324] border border-cyan-700 rounded-xl px-5 py-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl border border-cyan-700"
            />
          )}

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50"
          >
            {loading
              ? "Uploading..."
              : "Save Game"}
          </button>

        </div>

      </div>

    </div>
  );
}