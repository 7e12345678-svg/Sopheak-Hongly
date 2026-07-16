"use client";

import PackageActions from "./PackageActions";

interface Package {
  name: string;
  price: number;
}

interface Props {
  index: number;
  pkg: Package;

  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PackageRow({
  index,
  pkg,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition">

      {/* No */}
      <td className="px-6 py-4 text-slate-400 font-semibold">
        {index + 1}
      </td>

      {/* Package */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-xl">
            💎
          </div>

          <div>

            <p className="font-semibold text-white">
              {pkg.name}
            </p>

            <p className="text-xs text-slate-400">
              Game Package
            </p>

          </div>

        </div>

      </td>

      {/* Price */}
      <td className="px-6 py-4">

        <span className="rounded-lg bg-green-500/20 px-3 py-1 font-semibold text-green-400">
          ${pkg.price}
        </span>

      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">

        <PackageActions
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </td>

    </tr>
  );
}