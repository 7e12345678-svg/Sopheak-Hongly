"use client";

import { useState } from "react";
import usePackages from "@/app/hooks/usePackages";
import PackageTable from "@/app/components/packages/PackageTable";
import AddPackageModal from "@/app/components/packages/AddPackageModal";

export default function PackagesPage() {
  const {
  games,
  loading,
  refresh,
} = usePackages();

  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] =
    useState<string | null>(null);

    const [openAdd, setOpenAdd] = useState(false);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b1d] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // =========================
  // Stats
  // =========================

  const totalGames = games.length;

  const totalPackages = games.reduce(
    (sum, game) => sum + game.packages.length,
    0
  );

  const featuredGames = games.filter(
    (g) => g.featured
  ).length;

  // =========================
  // Search
  // =========================

  const filteredGames = games.filter((game) =>
    game.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#070b1d] text-white p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            📦 Package Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all game packages
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search game..."
          className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 outline-none focus:border-cyan-400"
        />

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="rounded-2xl border border-cyan-600 bg-slate-900 p-6">
          <p className="text-slate-400">
            Total Games
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalGames}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-600 bg-slate-900 p-6">
          <p className="text-slate-400">
            Total Packages
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalPackages}
          </h2>
        </div>

        <div className="rounded-2xl border border-yellow-500 bg-slate-900 p-6">
          <p className="text-slate-400">
            Featured Games
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {featuredGames}
          </h2>
        </div>

      </div>

      {/* Games */}

      <div className="space-y-6">

        {filteredGames.map((game) => (

          <div
            key={game._id}
            className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"
          >

            {/* Header */}

            <div className="flex items-center justify-between gap-4 p-6">

  <div>
    <h2 className="text-2xl font-bold">
      {game.name}
    </h2>

    <p className="text-slate-400 mt-1">
      {game.packages.length} Packages
    </p>
  </div>

  <div className="flex items-center gap-3">

    <button
      onClick={() => {
        setSelectedGame(game._id);
        setOpenAdd(true);
      }}
      className="rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-3 transition"
    >
      + Add Package
    </button>

    <button
      onClick={() =>
        setSelectedGame(
          selectedGame === game._id
            ? null
            : game._id
        )
      }
      className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 transition"
    >
      {selectedGame === game._id
        ? "Hide Packages"
        : "Manage Packages"}
    </button>

  </div>

</div>

            {/* Table */}

            {selectedGame === game._id && (

              <div className="border-t border-slate-800">

                <PackageTable
  game={game}
  refresh={refresh}
/>

              </div>

            )}

          </div>

        ))}

      </div>

    <AddPackageModal
  open={openAdd}
  gameId={selectedGame || ""}
  gameName={
    games.find((g) => g._id === selectedGame)?.name || ""
  }
  onClose={() => setOpenAdd(false)}
  refresh={refresh}
/>

    </main>
  );
}