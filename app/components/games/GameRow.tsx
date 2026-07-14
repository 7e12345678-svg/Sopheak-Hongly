"use client";

import Image from "next/image";
import GameStatus from "./GameStatus";
import GameActions from "./GameActions";

export interface Game {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  featured: boolean;
  sortOrder: number;
  status: boolean;
  createdAt: string;
}

interface Props {
  game: Game;

  onEdit: (game: Game) => void;

  onDelete: (id: string) => void;

  onToggleFeatured: (
    id: string,
    featured: boolean
  ) => void;
}

export default function GameRow({
  game,
  onEdit,
  onDelete,
  onToggleFeatured,
}: Props) {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition">

      {/* Logo */}
      <td className="px-6 py-4">
        <Image
          src={game.image}
          alt={game.name}
          width={56}
          height={56}
          className="rounded-xl object-cover border border-slate-700"
        />
      </td>

      {/* Name */}
      <td className="px-6 py-4">
        <div className="font-semibold text-white">
          {game.name}
        </div>

        <div className="text-xs text-slate-400">
          {game.description || "No description"}
        </div>
      </td>

      {/* Slug */}
      <td className="px-6 py-4 text-slate-300">
        {game.slug}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <GameStatus status={game.status} />
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-slate-400">
        {new Date(game.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
  <div className="flex items-center justify-center gap-2">

    <button
      onClick={() =>
        onToggleFeatured(
          game._id,
          game.featured
        )
      }
      className={`h-10 w-10 rounded-lg transition ${
        game.featured
          ? "bg-yellow-500 text-black"
          : "bg-slate-700 text-slate-300 hover:bg-yellow-500 hover:text-black"
      }`}
      title="Featured"
    >
      ⭐
    </button>

    <GameActions
      onEdit={() => onEdit(game)}
      onDelete={() => onDelete(game._id)}
    />

  </div>
</td>

    </tr>
  );
}