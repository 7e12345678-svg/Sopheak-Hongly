"use client";

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
  return (
    <div className="mb-8 space-y-5">
      {/* Search / Status / Export */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Input
          className="lg:col-span-6"
          placeholder="Search player or game ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            lg:col-span-3
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-white
            outline-none
            focus:border-cyan-400
          "
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <Button
          className="lg:col-span-3"
          onClick={exportExcel}
        >
          📥 Export Excel
        </Button>
      </div>

      {/* Date Filter */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
            text-white
            outline-none
            focus:border-cyan-400
          "
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
            bg-slate-900
            px-4
            py-3
            text-white
            outline-none
            focus:border-cyan-400
          "
        />
      </div>
    </div>
  );
}