"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import AddGameModal from "@/app/components/games/AddGameModal";
import EditGameModal from "@/app/components/games/EditGameModal";
import GameTable from "@/app/components/games/GameTable";
import GameStats from "@/app/components/games/GameStats";

export interface Game {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: boolean;
  createdAt: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedGame, setSelectedGame] =
    useState<Game | null>(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  // =========================
  // Fetch Games
  // =========================

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games");
      const data = await res.json();

      setGames(data.games || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // =========================
  // Search
  // =========================

  const filteredGames = games.filter((game) =>
    game.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    filteredGames.length / itemsPerPage
  );

  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =========================
  // Stats
  // =========================

  const totalGames = games.length;

  const activeGames =
    games.filter((g) => g.status).length;

  const hiddenGames =
    games.filter((g) => !g.status).length;

  const newestGame =
    games.length > 0 ? games[0].name : "-";

  // =========================
  // Delete
  // =========================

  const deleteGame = async (id: string) => {
    const ok = confirm("Delete this game?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/games/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Game Deleted");

      fetchGames();
    } catch (err) {
      console.error(err);

      toast.error("Delete Failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#070b1d] text-white p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            🎮 Game Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all available games
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          + Add Game
        </button>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search game..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-[#10182d] border border-cyan-600 rounded-xl px-5 py-3 outline-none"
        />

      </div>

      {/* Stats */}

      <GameStats
        total={totalGames}
        active={activeGames}
        hidden={hiddenGames}
        newest={newestGame}
      />

      {/* Table */}

      <GameTable
        games={paginatedGames}
        loading={loading}
        refresh={fetchGames}
        onEdit={(game) => {
          setSelectedGame(game);
          setOpenEdit(true);
        }}
        onDelete={deleteGame}
      />

      {/* Pagination */}

      <div className="flex justify-center items-center gap-3 mt-8">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((p) => p - 1)
          }
          className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-cyan-400 font-bold">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((p) => p + 1)
          }
          className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40"
        >
          Next
        </button>

      </div>

      {/* Add Modal */}

      <AddGameModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        refresh={fetchGames}
      />

      {/* Edit Modal */}

      <EditGameModal
        open={openEdit}
        game={selectedGame}
        onClose={() => {
          setOpenEdit(false);
          setSelectedGame(null);
        }}
        refresh={fetchGames}
      />

    </main>
  );
}