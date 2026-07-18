"use client";

import { PackageSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <PackageSearch
        size={70}
        className="text-slate-600"
      />

      <h2 className="mt-6 text-2xl font-bold text-white">
        No Orders Found
      </h2>

      <p className="mt-3 text-slate-400">
        Try changing your search or filters.
      </p>
    </div>
  );
}