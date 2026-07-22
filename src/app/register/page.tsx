"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
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

      toast.success("Account created successfully 🎉");

      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d455,transparent_50%)]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(6,182,212,.15)]"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.png"
            width={80}
            height={80}
            alt="Logo"
          />

          <h1 className="mt-4 text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-center text-slate-400">
            Join Z-Store today
          </p>
        </div>

        <div className="mt-8 space-y-4">

          <div className="relative">
            <User className="absolute left-4 top-4 text-cyan-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white focus:border-cyan-400 outline-none"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-cyan-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white focus:border-cyan-400 outline-none"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-4 text-cyan-400" size={18} />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white focus:border-cyan-400 outline-none"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-cyan-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-12 text-white focus:border-cyan-400 outline-none"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              className="absolute right-4 top-3 text-slate-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black hover:bg-cyan-400 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 font-semibold">
              Sign In
            </Link>
          </p>

        </div>
      </form>
    </main>
  );
}