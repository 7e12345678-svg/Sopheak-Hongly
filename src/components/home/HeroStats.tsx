const stats = [
  {
    title: "Customers",
    value: "10K+",
  },
  {
    title: "Orders",
    value: "50K+",
  },
  {
    title: "Secure",
    value: "100%",
  },
  {
    title: "Support",
    value: "24/7",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center backdrop-blur"
        >
          <h3 className="text-2xl font-bold text-cyan-400">{item.value}</h3>

          <p className="mt-1 text-sm text-slate-400">{item.title}</p>
        </div>
      ))}
    </div>
  );
}