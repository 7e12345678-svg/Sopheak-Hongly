"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
  async function checkLogin() {
    try {
      const res = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = await res.json();

      if (data.success) {
        setCurrentUser(data.user);
        router.replace("/");
      }
    } catch {}
  }

  checkLogin();
}, [router, setCurrentUser]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

if (!data.success) {
  toast.error(data.message);
  return;
}

setCurrentUser(data.user);

toast.success("Welcome Back 🎉");

router.replace("/");
router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d455,transparent_50%)]" />

      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-[0_0_60px_rgba(6,182,212,.15)] backdrop-blur-xl"
      >
        {/* Fake Inputs to reduce Chrome autofill */}
        <input
          type="text"
          name="fake_username"
          autoComplete="username"
          className="hidden"
          tabIndex={-1}
        />

        <input
          type="password"
          name="fake_password"
          autoComplete="current-password"
          className="hidden"
          tabIndex={-1}
        />

        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.png"
            width={80}
            height={80}
            alt="Logo"
            priority
          />

          <h1 className="mt-4 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-center text-slate-400">
            Sign in to your Z-Store account
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-cyan-400"
            />

            <input
              type="email"
              name="login_email"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Email Address"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-400"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-cyan-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="login_password"
              autoComplete="new-password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-12 text-white outline-none transition focus:border-cyan-400"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-3 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-cyan-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}