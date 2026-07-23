import { Star } from "lucide-react";

const reviews = [
  {
    name: "Hong Ly",
    game: "Mobile Legends",
    comment: "Fast delivery and trusted service. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sokha",
    game: "PUBG Mobile",
    comment: "Payment was easy and UC arrived instantly.",
    rating: 5,
  },
  {
    name: "Dara",
    game: "Roblox",
    comment: "Best price and excellent customer support.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Customer Reviews
          </h2>

          <p className="mt-3 text-slate-400">
            Trusted by thousands of gamers.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
            >
              <div className="mb-4 flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-300">
                "{review.comment}"
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-white">
                  {review.name}
                </h4>

                <span className="text-sm text-cyan-400">
                  {review.game}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}