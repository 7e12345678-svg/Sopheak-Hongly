"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Clock3, ArrowRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

export default function FlashSale() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-blue-500/10 p-8 backdrop-blur-xl"
        >
          {/* Background Glow */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                <Flame size={16} />
                FLASH SALE
              </div>

              <h2 className="mt-5 text-4xl font-black text-white">
                Get up to
                <span className="text-cyan-400"> 30% OFF </span>
                Today
              </h2>

              <p className="mt-4 max-w-xl text-slate-300">
                Limited-time discounts on UC, Diamonds and Robux.
                Top up now before the promotion ends.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">

             <div className="space-y-3">
  <div className="flex items-center gap-2 text-cyan-300">
    <Clock3 size={18} />
    <span className="font-semibold">
      Offer Ends In
    </span>
  </div>

  <CountdownTimer />
</div>

              <Link
                href="/games"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}