"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PackageRow from "./PackageRow";
import EmptyPackage from "./EmptyPackage";
import EditPackageModal from "./EditPackageModal";

interface Package {
  name: string;
  price: number;
}

interface Game {
  _id: string;
  name: string;
  packages: Package[];
}

interface Props {
  game: Game;
  refresh: () => Promise<void>;
}

export default function PackageTable({
  game,
  refresh,
}: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  if (game.packages.length === 0) {
    return <EmptyPackage />;
  }

  // =========================
  // Edit
  // =========================

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setOpenEdit(true);
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = async (index: number) => {
    const ok = confirm(
      `Delete "${game.packages[index].name}" ?`
    );

    if (!ok) return;

    try {
      const res = await fetch(
        `/api/packages/${game._id}?index=${index}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Package deleted");

        await refresh();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-slate-950">
            <tr>

              <th className="px-6 py-4 text-left text-slate-400">
                #
              </th>

              <th className="px-6 py-4 text-left text-slate-400">
                Package
              </th>

              <th className="px-6 py-4 text-left text-slate-400">
                Price
              </th>

              <th className="px-6 py-4 text-center text-slate-400">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {game.packages.map((pkg, index) => (
              <PackageRow
                key={`${pkg.name}-${index}`}
                index={index}
                pkg={pkg}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}

          </tbody>

        </table>
      </div>

      <EditPackageModal
        open={openEdit}
        gameId={game._id}
        index={editingIndex}
        packageData={
          editingIndex !== null
            ? game.packages[editingIndex]
            : null
        }
        onClose={() => {
          setOpenEdit(false);
          setEditingIndex(null);
        }}
        refresh={refresh}
      />
    </>
  );
}