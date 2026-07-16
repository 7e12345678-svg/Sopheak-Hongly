"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Game {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: boolean;
}

interface Props {
  open: boolean;
  game: Game | null;
  onClose: () => void;
  refresh: () => void;
}

export default function EditGameModal({
  open,
  game,
  onClose,
  refresh,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {

    if (!game) return;

    setName(game.name);
    setSlug(game.slug);
    setDescription(game.description);
    setStatus(game.status);
    setPreview(game.image);

  }, [game]);

  if (!open || !game) return null;

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  const updateGame = async () => {

    setLoading(true);

    const form = new FormData();

    form.append("name", name);
    form.append("slug", slug);
    form.append("description", description);
    form.append("status", String(status));

    if (image) {
      form.append("image", image);
    }

    const res = await fetch(`/api/games/${game._id}`, {
      method: "PUT",
      body: form,
    });

    const data = await res.json();

    setLoading(false);

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success("Game Updated");

    refresh();

    onClose();

  };

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#10182d] rounded-xl p-8 w-[520px]">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Edit Game
        </h2>

        <input
          className="w-full mb-4 p-3 rounded bg-[#1b2740]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Game Name"
        />

        <input
          className="w-full mb-4 p-3 rounded bg-[#1b2740]"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
        />

        <textarea
          className="w-full mb-4 p-3 rounded bg-[#1b2740]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label className="flex items-center gap-3 mb-4">

          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />

          Active

        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {preview && (

          <img
            src={preview}
            className="w-full h-52 object-cover rounded-lg mt-4"
          />

        )}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-600 rounded"
          >
            Cancel
          </button>

          <button
            onClick={updateGame}
            disabled={loading}
            className="px-5 py-2 bg-cyan-500 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>

    </div>

  );

}