"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "HongLy The King",
    avatar: "/avatars/user5.jpg",
    game: "PUBG Mobile",
    review:
      "Fast delivery! I received my UC in less than 10 seconds. Highly recommended.",
  },
  {
    name: "Snake",
    avatar: "/avatars/user2.jpg",
    game: "Free Fire",
    review:
      "Very secure payment and excellent customer support. I'll definitely use it again.",
  },
  {
    name: "Ster kak",
    avatar: "/avatars/user3.jpg",
    game: "Mobile Legends",
    review:
      "The prices are great and the top up process is incredibly easy.",
  },
  {
    name: "J'rok",
    avatar: "/avatars/user4.jpg",
    game: "Roblox",
    review:
      "Amazing experience! The Robux arrived instantly after payment.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-400">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            What Gamers Say
          </h2>

          <p className="mt-4 text-slate-400">
            Trusted by thousands of gamers worldwide.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-cyan-500/20 bg-white/5 p-7 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />

                <div>
                  <h3 className="font-bold text-white">{review.name}</h3>

                  <p className="text-sm text-cyan-400">{review.game}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-5 leading-7 text-slate-300">
                "{review.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}