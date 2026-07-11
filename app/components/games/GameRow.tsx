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
  status: boolean;
  createdAt: string;
}

interface Props {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export default function GameRow({
  game,
  onEdit,
  onDelete,
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
        <GameActions
          onEdit={() => onEdit(game)}
          onDelete={() => onDelete(game._id)}
        />
      </td>

    </tr>
  );
}