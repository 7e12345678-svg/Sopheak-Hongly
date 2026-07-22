"use client";

import { useEffect, useState } from "react";

interface User {
  fullname: string;
  username: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      });
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

        <div className="flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500 text-4xl font-bold text-white">
            {user.fullname.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              {user.fullname}
            </h1>

            <p className="text-slate-400">
              @{user.username}
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <InfoCard
            label="Email"
            value={user.email}
          />

          <InfoCard
            label="Phone"
            value={user.phone || "Not set"}
          />

          <InfoCard
            label="Member Since"
            value={new Date(user.createdAt).toLocaleDateString()}
          />

        </div>

      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}