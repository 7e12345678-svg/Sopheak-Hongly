"use client";

interface Props {
  greeting: string;
  currentTime: Date;
  mounted: boolean;
  pendingOrders: number;
  onLogout: () => void;
}

export default function DashboardHeader({
  greeting,
  currentTime,
  mounted,
  pendingOrders,
  onLogout,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-5xl font-extrabold text-white">
          Dashboard
        </h1>

        {pendingOrders > 0 && (
          <div className="relative">
            🔔

            <span
              className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              rounded-full
              w-6
              h-6
              flex
              items-center
              justify-center
            "
            >
              {pendingOrders}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">

        <div>
          <p className="text-gray-400 mt-2">
            Manage all customer top up orders
          </p>
        </div>

        

      </div>

      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center">

        <div>
          <h1 className="text-4xl font-bold text-white">
            {greeting}, Admin
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your Game Top-Up business in real time.
          </p>
        </div>

        <div className="mt-6 lg:mt-0 text-right">
          <p className="text-cyan-400 font-semibold">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {mounted
              ? currentTime.toLocaleTimeString()
              : "--:--:--"}
          </h2>
        </div>

      </div>
    </>
  );
}