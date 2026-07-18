"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaDiscord,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const games = [
  "Mobile Legends",
  "PUBG Mobile",
  "Free Fire",
  "Roblox",
];

const payments = [
  { name: "ABA Bank", logo: "/payments/aba.png" },
  { name: "Wing Bank", logo: "/payments/wing.png" },
  { name: "ACLEDA Bank", logo: "/payments/acleda.png" },
  { name: "AMK Bank", logo: "/payments/amk.png" },
];

const socials = [
  {
    icon: <FaFacebookF size={20} />,
    href: "https://www.facebook.com/",
    name: "Facebook",
  },
  {
    icon: <FaTelegramPlane size={20} />,
    href: "https://t.me/SopheakHongly",
    name: "Telegram",
  },
  {
    icon: <FaDiscord size={20} />,
    href: "https://discord.gg/YourInviteCode",
    name: "Discord",
  },
  {
    icon: <FaTiktok size={20} />,
    href: "https://www.tiktok.com/@hong_ly28?is_from_webapp=1&sender_device=pc",
    name: "YouTube",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cyan-500/10 bg-[#050816]">
      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-cyan-500/40" />
      <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="TopUp"
                width={55}
                height={55}
              />

              <div>
                <h2 className="text-2xl font-bold text-white">
                  TopUp Game Center
                </h2>

                <p className="text-cyan-400">
                  Fast • Secure • Instant
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Cambodia's trusted game top-up platform with instant
              delivery, secure payment and 24/7 customer support.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-5">
              <div>
                <h3 className="text-2xl font-black text-cyan-400">
                  50K+
                </h3>
                <p className="text-sm text-slate-400">Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-cyan-400">
                  200K+
                </h3>
                <p className="text-sm text-slate-400">Orders</p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-cyan-400">
                  24/7
                </h3>
                <p className="text-sm text-slate-400">Support</p>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 flex gap-4">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500 hover:text-black"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-6 space-y-3">
              <Link href="/" className="block text-slate-400 hover:text-cyan-400">
                Home
              </Link>

              <Link href="/games" className="block text-slate-400 hover:text-cyan-400">
                Games
              </Link>

              <Link href="/topup" className="block text-slate-400 hover:text-cyan-400">
                Top Up
              </Link>

              <Link href="/dashboard" className="block text-slate-400 hover:text-cyan-400">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Popular Games
            </h3>

            <div className="mt-6 space-y-3">
              {games.map((game) => (
                <p key={game} className="text-slate-400">
                  {game}
                </p>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Newsletter
            </h3>

            <p className="mt-5 text-slate-400">
              Get promotions and latest updates.
            </p>

            <div className="mt-6 flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
              <Mail size={18} className="text-cyan-400" />

              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button className="mt-4 w-full rounded-xl bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 TopUp Game Center. All Rights Reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cyan-400">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-cyan-400">
              Terms of Service
            </Link>

            <Link href="/support" className="hover:text-cyan-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}