interface Props {
  title: string;
  value: number;
  color: string;
}

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6">

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}