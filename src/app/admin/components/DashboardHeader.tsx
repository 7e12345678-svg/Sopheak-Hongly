"use client";

interface Props {
  currentTime: Date;
  mounted: boolean;
}

export default function DashboardHeader({
  currentTime,
  mounted,
}: Props) {
  return (
    <div className="mb-10 flex items-start justify-between">
      <div>
        <h1 className="text-5xl font-extrabold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-lg text-gray-400">
          Manage your Game Top-Up business
        </p>
      </div>

      <div className="text-right">
        <p className="text-xl font-semibold text-cyan-400">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <h2 className="mt-2 text-5xl font-bold text-white">
          {mounted
            ? currentTime.toLocaleTimeString()
            : "--:--:--"}
        </h2>
      </div>
    </div>
  );
}