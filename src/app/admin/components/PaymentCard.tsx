interface Props {
  payment: string;
  total: number;
  percentage: number;
}

const paymentImages: Record<string, string> = {
  ABA: "/images/aba.jpg",
  ACLEDA: "/images/acleda.jpg",
  Wing: "/images/wing.jpg",
  AMK: "/images/AMK.jpg",
};

export default function PaymentCard({
  payment,
  total,
  percentage,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-green-500 p-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400">
            💳 Most Used Payment
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-3">
            {payment}
          </h2>

          <p className="text-gray-500 mt-2">
            {total} Orders
          </p>

          <p className="text-cyan-400 font-bold mt-3">
            {percentage}% of all orders
          </p>
        </div>

        <img
          src={paymentImages[payment] || "/images/default.jpg"}
          alt={payment}
          className="w-20 h-20 rounded-xl object-cover"
        />
      </div>
    </div>
  );
}