"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const payments = [
  {
    name: "ABA Bank",
    logo: "/payments/aba.png",
  },
  {
    name: "Wing Bank",
    logo: "/payments/wing.png",
  },
  {
    name: "ACLEDA Bank",
    logo: "/payments/acleda.png",
  },
  {
    name: "AMK Bank",
    logo: "/payments/amk.png",
  },
];

const avatars = [
  "/avatars/user1.jpg",
  "/avatars/user2.jpg",
  "/avatars/user3.jpg",
  "/avatars/user4.jpg",
];

export default function TrustedSection() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="font-semibold uppercase tracking-[4px] text-cyan-400">
                Trusted Community
              </span>

              <h2 className="mt-4 text-4xl font-black text-white">
                Trusted by{" "}
                <span className="text-cyan-400">60,000+</span>
                <br />
                Gamers
              </h2>

              <p className="mt-5 max-w-lg leading-8 text-slate-400">
                Join thousands of players who top up safely every day with
                instant delivery, secure payment, and professional support.
              </p>

              {/* Avatar */}
              <div className="mt-10 flex items-center">
                <div className="flex">
                  {avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className="-ml-3 first:ml-0"
                    >
                      <Image
                        src={avatar}
                        alt={`User ${index + 1}`}
                        width={52}
                        height={52}
                        className="rounded-full border-4 border-[#050816] object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="ml-5">
                  <h3 className="text-xl font-bold text-white">
                    60K+
                  </h3>

                  <p className="text-slate-400">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-6">
              {payments.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  className="flex h-36 items-center justify-center rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6 transition hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={120}
                    height={60}
                    className="h-auto w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}