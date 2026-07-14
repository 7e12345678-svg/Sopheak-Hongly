"use client";

const features = [
  {
    icon: "⚡",
    title: "Instant Delivery",
    desc: "Receive your top up instantly after payment.",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    desc: "Safe payment with trusted Cambodian banks.",
  },
  {
    icon: "💰",
    title: "Best Price",
    desc: "Affordable prices with great value.",
  },
  {
    icon: "🕒",
    title: "24/7 Support",
    desc: "Our team is ready to help anytime.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-950 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Fast, Secure & Reliable
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Everything you need for a fast and secure game top up experience.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (

            <div
              key={item.title}
              className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              p-8
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-cyan-400
              hover:shadow-xl
              hover:shadow-cyan-500/20
              "
            >

              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-400 leading-7">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}