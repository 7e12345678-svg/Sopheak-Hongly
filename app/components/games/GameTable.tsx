"use client";

import GameRow, { Game } from "./GameRow";

interface Props {
  games: Game[];
  loading: boolean;
  refresh: () => void;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export default function GameTable({
  games,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <p className="text-slate-400">Loading games...</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-16 text-center">
        <div className="text-6xl mb-4">🎮</div>

        <h2 className="text-2xl font-bold text-white">
          No Games Found
        </h2>

        <p className="text-slate-400 mt-2">
          Click "Add Game" to create your first game.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

        <div>
          <h2 className="text-xl font-bold text-white">
            Game List
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Total Games : {games.length}
          </p>
        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-950">

            <tr>

              <th className="px-6 py-4 text-left text-slate-400">
                Logo
              </th>

              <th className="px-6 py-4 text-left text-slate-400">
                Game
              </th>

              <th className="px-6 py-4 text-left text-slate-400">
                Slug
              </th>

              <th className="px-6 py-4 text-left text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-slate-400">
                Created
              </th>

              <th className="px-6 py-4 text-center text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {games.map((game) => (

              <GameRow
                key={game._id}
                game={game}
                onEdit={onEdit}
                onDelete={onDelete}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}