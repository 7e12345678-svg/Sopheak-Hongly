"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  useSearchParams,
  
  useRouter,
} from "next/navigation";
import toast from "react-hot-toast";

interface Package {
  name: string;
  price: number;
}

interface GameData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  packages: Package[];
}

  const paymentLogos = {
  ABA: "/images/aba.jpg",
  Wing: "/images/wing.jpg",
  ACLEDA: "/images/acleda.jpg",
  AMK: "/images/amk.jpg",
};

export default function TopUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [payment, setPayment] = useState("ABA");

  const game = searchParams.get("game");

  const [screenshot, setScreenshot] = useState<File | null>(null);

 

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    gameId: "",
    playerName: "",
    serverId: "",
    package: "",
    phone: "",
  });


  const [gameData, setGameData] =

  useState<GameData | null>(null);

   const packages = gameData?.packages ?? [];


  useEffect(() => {
  if (packages.length === 0) return;

  setFormData((prev) => ({
    ...prev,
    package: packages[0].name,
  }));
}, [packages]);

useEffect(() => {
  if (!game) return;

  const slug = game
    .toLowerCase()
    .replace(/\s+/g, "-");

  const fetchGame = async () => {
    try {
      const res = await fetch(
        `/api/games/by-slug/${slug}`
      );

      const data = await res.json();

      if (data.success) {
        setGameData(data.game);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchGame();
}, [game]);

  const handleSubmit = async () => {
  if (
    !formData.gameId ||
    !formData.playerName ||
    !formData.serverId ||
    !formData.phone
  ) {
    toast.error("សូមបំពេញព័ត៌មានឱ្យគ្រប់");
    return;
  }

  if (formData.phone.length < 8) {
    toast.error("Phone number is invalid");
    return;
  }

  if (!screenshot) {
    toast.error("សូម Upload Payment Screenshot");
    return;
  }

  try {
    setLoading(true);

    const selectedPackage = packages.find(
  (p) => p.name === formData.package
);

    const form = new FormData();

    form.append("game", game ?? "");
    form.append("gameId", formData.gameId);
    form.append("playerName", formData.playerName);
    form.append("serverId", formData.serverId);
    form.append("package", formData.package);
form.append(
  "price",
  String(selectedPackage?.price ?? 0)
);
    form.append("payment", payment);
    form.append("phone", formData.phone);
    form.append("screenshot", screenshot);

const res = await fetch("/api/orders", {
  method: "POST",
  body: form,
});

const data = await res.json();

console.log(data);

if (data.success) {
  const audio = new Audio("/sounds/notification.mp3");

  audio.play().catch(console.error);

  toast.success("Order submitted successfully!");

  setSuccess(true);

  setFormData({
    gameId: "",
    playerName: "",
    serverId: "",
    package: "",
    phone: "",
  });

  setScreenshot(null);
  setPreview("");
} else {
  toast.error(data.error || "Failed to submit order");
}

    
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
  <main className="min-h-screen bg-slate-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-4 sm:p-5 sm:p-8 shadow-2xl border border-slate-800">

      {/* Game Image */}
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
<h1 className="w-full rounded-xl bg-slate-800 p-3 sm:p-4 outline-none focus:ring-2 focus:ring-cyan-500">
  {gameData?.name
    ? `${gameData.name} Top Up`
    : "Game Top Up"}
</h1>

      {/* Game */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">Game</label>

        <input
          type="text"
          value={gameData?.name ?? ""}
          readOnly
          className="w-full p-3 rounded-lg bg-slate-800"
        />
      </div>

      {/* Game ID */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">Game ID</label>

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

      {/* Player Name */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">Player Name</label>

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

      {/* Server ID */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Server ID</label>

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
    className="w-full p-3 rounded-lg bg-slate-800"
  />
</div>

      {/* Top Up Amount */}
<div className="mb-6">
  <label className="block text-base sm:text-lg font-bold text-cyan-400 mb-4">
    💎 Top Up Amount
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
      className={`rounded-2xl p-4 sm:p-5 border-2 transition ${
        formData.package === item.name
          ? "bg-cyan-500 text-black border-cyan-300 scale-105"
          : "bg-slate-800 border-slate-700 hover:border-cyan-400"
      }`}
    >
      <div className="text-3xl sm:text-4xl">💎</div>

      <h3 className="font-bold mt-2">
        {item.name}
      </h3>

      <p className="text-sm mt-1">
        ${item.price}
      </p>
    </button>

  ))

)}
  </div>
</div>

{/* Payment */}
<div className="mb-6">
  <label className="block text-base sm:text-lg font-bold text-cyan-400 mb-4">
    💳 Payment Method
  </label>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {["ABA", "Wing", "ACLEDA", "AMK"].map((method) => (
      
      <button
        key={method}
        type="button"
        disabled={loading}
        onClick={() => setPayment(method)}
        className={`rounded-xl p-4 border-2 transition ${
          payment === method
            ? "bg-cyan-500 text-black border-cyan-300"
            : "bg-slate-800 border-slate-700 hover:border-cyan-400"
            
        }`}
      >
        <div className="flex flex-col items-center gap-2">
  <Image
    src={paymentLogos[method as keyof typeof paymentLogos]}
    alt={method}
    width={50}
    height={50}
  />

  <span className="font-semibold">
    {method}
  </span>
</div>
      </button>
    ))}
  </div>
</div>


{/* Upload Screenshot */}
<div className="mb-8">
  <label className="block mb-3 font-semibold">
    Upload Payment Screenshot
  </label>

  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl h-44 cursor-pointer hover:border-cyan-400">

    <span className="text-5xl">📷</span>

    <p className="mt-3 text-gray-400">
      Click to upload screenshot
    </p>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];

if (!file) return;

if (file.size > 5 * 1024 * 1024) {
  toast.error("Image must be smaller than 5MB");
  return;
}


        setScreenshot(file);
        setPreview(URL.createObjectURL(file));
      }}
    />
  </label>

  {preview && (
    <div className="mt-5 flex justify-center">
      <Image
        src={preview}
        alt="Preview"
        width={180}
        height={180}
        className="rounded-xl border-2 border-cyan-500 w-44 h-44 sm:w-56 sm:h-56 object-cover"
      />
    </div>
  )}
</div>
{/* QR Code */}
<div className="mb-8 text-center">
  <p className="mb-4 text-gray-300">
    Scan this QR before submitting your order.
  </p>

  <Image
    src={
      payment === "AMK"
      ? "/images/AMK.png"
      : `/images/${payment.toLowerCase()}.png`}
    alt={payment}
    width={180}
    height={180}
    className="mx-auto rounded-xl w-44 h-44 sm:w-56 sm:h-56"
  />
</div>

{/* Submit Button */}
<button
  onClick={handleSubmit}
  disabled={loading}
  className={`w-full py-4 rounded-xl text-base sm:text-lg font-bold transition ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105"
  }`}
>
  {loading ? (
<div className="flex justify-center items-center gap-2">

<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

Submitting...

</div>
) : (
"Submit Order"
)}
</button>

{/* Success Modal */}
{success && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-slate-900 rounded-2xl p-8 w-[92%] max-w-md text-center">

      <div className="text-6xl mb-4">🎉</div>

      <h2 className="text-2xl font-bold text-green-400">
        Order Submitted!
      </h2>

      <p className="mt-3 text-gray-300">
        Your order has been received successfully.
      </p>

      <button
        onClick={() => {setSuccess(false);
          router.push("/");
        }}
        className="mt-6 px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-black"
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