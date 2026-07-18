"use client";

import { Search, Download, RotateCcw, Calendar } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  exportExcel: () => void;
}

export default function SearchFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  exportExcel,
}: Props) {
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setStartDate("");
    setEndDate("");
  };

  const activeFilters =
    Number(search !== "") +
    Number(statusFilter !== "All") +
    Number(startDate !== "") +
    Number(endDate !== "");

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Search Orders
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Filter orders by player, status and date.
          </p>
        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
          Active Filters : {activeFilters}
        </div>

      </div>

      {/* Search + Status */}
      <div className="grid gap-4 lg:grid-cols-12">

        <div className="relative lg:col-span-6">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <Input
            className="pl-11 pr-11"
            placeholder="Search player, phone, game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              ✕
            </button>
          )}

        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            lg:col-span-3
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-cyan-400
          "
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <Button
          className="lg:col-span-3 flex items-center justify-center gap-2"
          onClick={exportExcel}
        >
          <Download size={18} />
          Export Excel
        </Button>

      </div>

      {/* Date */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">

        <div className="relative">

          <Calendar
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              py-3
              pl-11
              pr-4
              text-white
              outline-none
              transition
              focus:border-cyan-400
            "
          />

        </div>

        <div className="relative">

          <Calendar
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              py-3
              pl-11
              pr-4
              text-white
              outline-none
              transition
              focus:border-cyan-400
            "
          />

        </div>

      </div>

      {/* Bottom */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

        <Button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600"
        >
          <RotateCcw size={18} />
          Reset
        </Button>

        <Button
          onClick={exportExcel}
          className="flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Export Excel
        </Button>

      </div>

    </div>
  );
}