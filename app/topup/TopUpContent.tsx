"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  useSearchParams,
  
  useRouter,
} from "next/navigation";
import toast from "react-hot-toast";

const paymentLogos = {
  ABA: "/images/aba.jpg",
  Wing: "/images/wing.jpg",
  ACLEDA: "/images/acleda.jpg",
  AMK: "/images/amk.jpg",
};
const gameImages = {
  "Mobile Legends": "/images/mlbb.jpg",
  "PUBG Mobile": "/images/pubg.jpg",
  "Free Fire": "/images/freefire.jpg",
  Roblox: "/images/roblox.jpg",
};

const gamePackages = {
  "Mobile Legends": [
    { name: "86 Diamonds", price: "$1" },
    { name: "172 Diamonds", price: "$3.5" },
    { name: "257 Diamonds", price: "$4" },
    { name: "514 Diamonds", price: "$10" },
  ],

  "PUBG Mobile": [
    { name: "60 UC", price: "$1" },
    { name: "325 UC", price: "$5" },
    { name: "660 UC", price: "$10" },
    { name: "1800 UC", price: "$25" },
  ],

  "Free Fire": [
    { name: "100 Diamonds", price: "$1" },
    { name: "310 Diamonds", price: "$3" },
    { name: "520 Diamonds", price: "$5" },
    { name: "1060 Diamonds", price: "$10" },
  ],

  Roblox: [
    { name: "80 Robux", price: "$1" },
    { name: "400 Robux", price: "$5" },
    { name: "800 Robux", price: "$10" },
    { name: "1700 Robux", price: "$20" },
  ],
};

export default function TopUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const game = searchParams.get("game");

  const packages =
    gamePackages[game as keyof typeof gamePackages] ??
    gamePackages["Mobile Legends"];

  const [payment, setPayment] = useState("ABA");

  const [screenshot, setScreenshot] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    
    gameId: "",
    playerName: "",
    serverId: "",
    package: packages[0].name,
    phone: "",
  });
  useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    package: packages[0].name,
  }));
}, [game, packages]);

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
  selectedPackage?.price.replace("$", "") || "0"
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
    package: packages[0].name,
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
  <main className="min-h-screen bg-slate-950 text-white py-20 px-6">
    <div className="max-w-2xl mx-auto bg-slate-900 rounded-xl p-8 shadow-xl">

      {/* Game Image */}
      <div className="flex justify-center mb-8">
        <Image
        src={gameImages[game as keyof typeof gameImages] ??
    "/images/mlbb.jpg"
  }
          alt={game ?? "Game"}
          width={180}
          height={180}
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8">
        {game ? `${game} Top Up` : "Game Top Up"}
      </h1>

      {/* Game */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">Game</label>

        <input
          type="text"
          value={game ?? ""}
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
  <label className="block text-lg font-bold text-cyan-400 mb-4">
    💎 Top Up Amount
  </label>

  <div className="grid grid-cols-2 gap-4">
    {packages.map((item) => (
      <button
        key={item.name}
        type="button"
        disabled={loading}
        onClick={() =>
          setFormData({
            ...formData,
            package: item.name,
          })
        }
        className={`rounded-2xl p-5 border-2 transition ${
          formData.package === item.name
            ? "bg-cyan-500 text-black border-cyan-300 scale-105"
            : "bg-slate-800 border-slate-700 hover:border-cyan-400"
        }`}
      >
        <div className="text-4xl">💎</div>

        <h3 className="font-bold mt-2">
          {item.name}
        </h3>

        <p className="text-sm mt-1">
          {item.price}
        </p>
      </button>
    ))}
  </div>
</div>

{/* Payment */}
<div className="mb-6">
  <label className="block text-lg font-bold text-cyan-400 mb-4">
    💳 Payment Method
  </label>

  <div className="grid grid-cols-2 gap-4">
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
        width={220}
        height={220}
        className="rounded-xl border-2 border-cyan-500"
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
    width={220}
    height={220}
    className="mx-auto rounded-xl"
  />
</div>

{/* Submit Button */}
<button
  onClick={handleSubmit}
  disabled={loading}
  className={`w-full py-4 rounded-xl text-lg font-bold transition ${
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
    <div className="bg-slate-900 rounded-2xl p-8 w-[380px] text-center">

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