"use client";

import Image from "next/image";
import type { Game } from "@/types";
import { Pencil, Trash2, Star } from "lucide-react";

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
    <tr className="border-t border-slate-800 hover:bg-slate-800/50 transition">

      {/* Logo */}
      <td className="px-6 py-4">
        {game.image ? (
          <Image
            src={game.image}
            alt={game.name}
            width={50}
            height={50}
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-xl">
            🎮
          </div>
        )}
      </td>


      {/* Name */}
      <td className="px-6 py-4">
        <p className="font-semibold text-white">
          {game.name}
        </p>

        {game.featured && (
          <span className="text-xs text-cyan-400">
            Featured
          </span>
        )}
      </td>


      {/* Slug */}
      <td className="px-6 py-4 text-slate-400">
        {game.slug}
      </td>


      {/* Status */}
      <td className="px-6 py-4">

        <button
          onClick={() =>
            onToggleFeatured(
              game._id,
              !game.featured
            )
          }
          className={`
            flex items-center gap-2 rounded-full px-3 py-1 text-sm
            ${
              game.featured
                ? "bg-cyan-500/20 text-cyan-400"
                : "bg-slate-800 text-slate-400"
            }
          `}
        >
          <Star size={15} />

          {game.featured
            ? "Featured"
            : "Normal"}
        </button>

      </td>


      {/* Created */}
      <td className="px-6 py-4 text-slate-400">
        {game.createdAt
          ? new Date(game.createdAt).toLocaleDateString()
          : "-"}
      </td>


      {/* Actions */}
      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onEdit(game)}
            className="rounded-lg bg-blue-500/20 p-2 text-blue-400 hover:bg-blue-500/30"
          >
            <Pencil size={18}/>
          </button>


          <button
            onClick={() =>
              onDelete(game._id)
            }
            className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500/30"
          >
            <Trash2 size={18}/>
          </button>

        </div>

      </td>

    </tr>
  );
}