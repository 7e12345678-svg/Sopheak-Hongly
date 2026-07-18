"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does the top up take?",
    answer:
      "Most orders are completed instantly after your payment is confirmed.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes. We use trusted payment methods and encrypted transactions to keep your information safe.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We support ABA, ACLEDA, Wing Bank, TrueMoney and other local payment methods.",
  },
  {
    question: "Can I request a refund?",
    answer:
      "If an order cannot be completed due to a system issue, our support team will assist you with a refund or replacement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-400">
            FAQ
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-400">
            Everything you need to know about our top-up service.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl"
              >
                <button
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: open ? 180 : 0,
                    }}
                  >
                    <ChevronDown className="text-cyan-400" />
                  </motion.div>
                </button>

                <AnimatePresence>

                  {open && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                    >
                      <div className="border-t border-cyan-500/10 px-6 py-5 text-slate-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}