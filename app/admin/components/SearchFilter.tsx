"use client";

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

      {/* Search Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search Player, Game ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            lg:col-span-6
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-5
            py-4
            outline-none
            transition
            focus:border-cyan-500
          "
        />

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            lg:col-span-3
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-5
            py-4
            outline-none
            transition
            focus:border-cyan-500
          "
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Export */}
        <button
          onClick={exportExcel}
          className="
            lg:col-span-3
            w-full
            rounded-xl
            bg-green-600
            px-5
            py-4
            font-bold
            transition
            hover:bg-green-500
          "
        >
          📥 Export Excel
        </button>

      </div>

      {/* Date Row */}
      <div
        className="
          grid
          grid-cols-2
          gap-3
          md:grid-cols-2
        "
      >

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
            text-sm
            outline-none
            transition
            focus:border-cyan-500
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
            text-sm
            outline-none
            transition
            focus:border-cyan-500
          "
        />

      </div>

    </div>
  );
}