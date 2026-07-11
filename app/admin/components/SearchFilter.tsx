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
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <button
          onClick={exportExcel}
          className="px-6 py-4 rounded-xl bg-green-600 hover:bg-green-500 font-bold transition"
        >
          📥 Export Excel
        </button>

        <input
          type="text"
          placeholder="Search Player or Game ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4"
        />

      </div>
    </>
  );
}