"use client";

interface Package {
  name: string;
  price: number;
}

interface Props {
  packages: Package[];
  selected: string;
  loading: boolean;
  onSelect: (value: string) => void;
}

export default function PackageSelector({
  packages,
  selected,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="mb-8">
      <label className="mb-4 block text-lg font-bold text-cyan-400">
        💎 Top Up Amount
      </label>

      <div className="grid grid-cols-2 gap-4">
        {packages.map((item) => (
          <button
            key={item.name}
            disabled={loading}
            onClick={() => onSelect(item.name)}
            className={`rounded-2xl border-2 p-5 transition ${
              selected === item.name
                ? "border-cyan-300 bg-cyan-500 text-black"
                : "border-slate-700 bg-slate-800"
            }`}
          >
            <div className="text-4xl">
              💎
            </div>

            <h3 className="mt-2 font-bold">
              {item.name}
            </h3>

            <p>${item.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}