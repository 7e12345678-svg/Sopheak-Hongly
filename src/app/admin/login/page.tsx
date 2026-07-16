"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Username ឬ Password មិនត្រឹមត្រូវ");
        return;
      }

      // JWT Cookie ត្រូវបាន API Set រួច
      window.location.replace("/admin");

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 w-[380px] rounded-xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-500"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-white font-bold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </main>
  );
}