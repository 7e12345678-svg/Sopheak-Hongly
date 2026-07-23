"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPaymentMethods } from "@/services/paymentMethods";

import useTopUp from "@/hooks/useTopUp";



export default function TopUpContent() {
  const searchParams = useSearchParams();

  const [methods, setMethods] = useState<any[]>([]);

  const game = searchParams.get("game");
  

  const {
    payment,
    setPayment,

    loading,

    success,
    setSuccess,

    preview,
    setPreview,

    screenshot,
    setScreenshot,

    gameData,

    packages,

    formData,
    setFormData,

    handleSubmit,

    router,
  } = useTopUp(game);

  useEffect(() => {
  async function fetchMethods() {
    try {
      const methods = await getPaymentMethods();

      setMethods(methods);

      // Default selected payment
      if (methods.length > 0 && !payment) {
        setPayment(methods[0].name);
      }
    } catch (error) {
      console.error("Failed to load payment methods:", error);
    }
  }

  fetchMethods();
}, [payment, setPayment]);

const getDiscountPrice = (price: number) => {
  return (price * 0.7).toFixed(2); // 30% OFF
};

  const getPackageIcon = () => {
  switch (gameData?.name?.toLowerCase()) {
    case "mobile legend":
    case "mobile legends":
      return "/images/mlbb.png";

    case "free fire":
      return "/images/freefire.png";

    case "pubg":
    case "pubg mobile":
      return "/images/uc.png";

    case "roblox":
      return "/images/robux.png"; // ឬ robux.png បើអ្នក rename

    default:
      return "/images/mlbb.png";
  }
};

  console.log("methods =", methods);
console.log("payment =", payment);
console.log("selected =", methods.find((m) => m.name === payment));

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-4 sm:p-8 shadow-2xl border border-slate-800">

    {/* Game Image */}
    <div className="flex justify-center mb-8">
      <Image
        src={gameData?.image || "/images/mlbb.jpg"}
        alt={gameData?.name || "Game"}
        width={160}
        height={160}
        className="rounded-2xl shadow-xl w-36 h-36 sm:w-44 sm:h-44 object-cover"
      />
    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold text-center mb-8">
      {gameData?.name
        ? `${gameData.name} Top Up`
        : "Game Top Up"}
    </h1>

    {/* Game */}
    <div className="mb-5">
      <label className="block mb-2 font-semibold">
        Game
      </label>

      <input
        type="text"
        value={gameData?.name ?? ""}
        readOnly
        className="w-full p-3 rounded-lg bg-slate-800"
      />
    </div>

    {/* Game ID */}
    <div className="mb-5">
      <label className="block mb-2 font-semibold">
        Game ID
      </label>

      <input
        type="text"
        placeholder="Enter Game ID"
        value={formData.gameId}
        onChange={(e) =>
          setFormData({
            ...formData,
            gameId: e.target.value,
          })
        }
        className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>

    {/* Player */}
    <div className="mb-5">
      <label className="block mb-2 font-semibold">
        Player Name
      </label>

      <input
        type="text"
        placeholder="Enter Player Name"
        value={formData.playerName}
        onChange={(e) =>
          setFormData({
            ...formData,
            playerName: e.target.value,
          })
        }
        className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>

    {/* Server */}
    <div className="mb-6">
      <label className="block mb-2 font-semibold">
        Server ID
      </label>

      <input
        type="text"
        placeholder="Enter Server ID"
        value={formData.serverId}
        onChange={(e) =>
          setFormData({
            ...formData,
            serverId: e.target.value,
          })
        }
        className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>

    {/* Phone */}
    <div className="mb-6">
      <label className="block mb-2 font-semibold">
        Phone Number
      </label>

      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="012345678"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value.replace(/\D/g, ""),
          })
        }
        className="w-full p-3 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>

    {/* Packages */}
    <div className="mb-8">
      <label className="block text-lg font-bold text-cyan-400 mb-4">
        {gameData?.name === "PUBG Mobile"
  ? "🪙 UC Top Up"
  : gameData?.name === "Roblox"
  ? "🟢 Robux Top Up"
  : "💎 Diamond Top Up"}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {packages.length === 0 ? (
          <div className="col-span-2 rounded-xl bg-slate-800 p-6 text-center text-slate-400">
            No packages available.
          </div>
        ) : (
          packages.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              disabled={loading}
              onClick={() =>
                setFormData({
                  ...formData,
                  package: item.name,
                })
              }
              className={`rounded-2xl border-2 p-5 transition ${
                formData.package === item.name
                  ? "bg-cyan-500 text-black border-cyan-300 scale-105"
                  : "bg-slate-800 border-slate-700 hover:border-cyan-400"
              }`}
            >
              <div className="mb-3 flex justify-center">
  <Image
    src={getPackageIcon()}
    alt={gameData?.name || "Package"}
    width={56}
    height={56}
    className="object-contain"
  />
</div>

              <h3 className="mt-2 font-bold">
                {item.name}
              </h3>

              <div className="mt-2 space-y-1">
  <p className="text-sm text-slate-400 line-through">
    ${item.price.toFixed(2)}
  </p>

  <div className="flex items-center justify-center gap-2">
    <p className="text-xl font-bold text-cyan-400">
      ${getDiscountPrice(item.price)}
    </p>

    <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
      30% OFF
    </span>
  </div>
</div>
            </button>
          ))
        )}
      </div>
    </div>

        {/* Payment */}
    <div className="mb-8">
      <label className="block text-lg font-bold text-cyan-400 mb-4">
        💳 Payment Method
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {methods.map((method) => (
         
            <button
              key={method._id}
              type="button"
              disabled={loading}
              onClick={() => setPayment(method.name)}
              className={`rounded-xl border-2 p-4 transition ${
                payment === method.name
                  ? "bg-cyan-500 text-black border-cyan-300"
                  : "bg-slate-800 border-slate-700 hover:border-cyan-400"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <img
  src={method.logo}
  alt={method.name}
  width={50}
  height={50}
  className="rounded-lg object-contain"
/>

                <span className="font-semibold">
                  {method.name}
                </span>
              </div>
            </button>
          )
        )}
      </div>
    </div>

    {/* Upload Screenshot */}
    <div className="mb-8">
      <label className="block mb-3 font-semibold">
        Upload Payment Screenshot
      </label>
<label className="flex h-44 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-600 hover:border-cyan-400 overflow-hidden">

  {preview ? (
    <Image
      src={preview}
      alt="Preview"
      width={500}
      height={500}
      className="h-full w-full object-contain p-2"
    />
  ) : (
    <div className="text-center">
      <div className="text-5xl">📷</div>

      <p className="mt-3 text-gray-400">
        Click to upload screenshot
      </p>
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    }}
  />
</label>
</div>

    {/* QR Code */}
    <div className="mb-8 text-center">
      <p className="mb-4 text-gray-300">
        Scan this QR Code before submitting your order.
      </p>

      <img
  src={
    methods.find((m) => m.name === payment)?.qr ||
    "/images/no-qr.png"
  }
  alt={payment}
  width={220}
  className="mx-auto rounded-xl"
/>
    </div>

        {/* Submit Button */}
    <button
      type="button"
      onClick={handleSubmit}
      disabled={loading}
      className={`w-full rounded-xl py-4 text-lg font-bold transition ${
        loading
          ? "cursor-not-allowed bg-gray-500"
          : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105"
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Submitting...
        </div>
      ) : (
        "Submit Order"
      )}
    </button>

    {/* Success Modal */}
    {success && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="w-[92%] max-w-md rounded-2xl bg-slate-900 p-8 text-center shadow-2xl">
          <div className="mb-4 text-6xl">🎉</div>

          <h2 className="text-2xl font-bold text-green-400">
            Order Submitted!
          </h2>

          <p className="mt-3 text-gray-300">
            Your order has been received successfully.
          </p>

          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              router.push("/");
            }}
            className="mt-6 rounded-xl bg-cyan-500 px-8 py-3 font-bold text-black transition hover:bg-cyan-400"
          >
            OK
          </button>
        </div>
      </div>
    )}
  </div>
</main>
  );
}