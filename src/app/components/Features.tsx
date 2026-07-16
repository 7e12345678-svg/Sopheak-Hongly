export default function Features() {
  return (
    <section className="bg-slate-800 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-xl text-center">
            <h3 className="text-white text-xl font-bold">
              Instant Delivery
            </h3>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl text-center">
            <h3 className="text-white text-xl font-bold">
              Secure Payment
            </h3>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl text-center">
            <h3 className="text-white text-xl font-bold">
              24/7 Support
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}