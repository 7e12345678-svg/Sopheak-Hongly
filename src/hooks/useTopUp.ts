"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createOrder } from "@/services/orders";

export interface Package {
  name: string;
  price: number;
}

export interface GameData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  packages: Package[];
}

export default function useTopUp(game: string | null) {
  const router = useRouter();

  const [payment, setPayment] = useState("ABA");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [preview, setPreview] = useState("");

  const [screenshot, setScreenshot] =
    useState<File | null>(null);

  const [gameData, setGameData] =
    useState<GameData | null>(null);

  const [formData, setFormData] = useState({
    gameId: "",
    playerName: "",
    serverId: "",
    package: "",
    phone: "",
  });

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
      } catch (err) {
        console.error(err);
      }
    };

    fetchGame();
  }, [game]);

  const handleSubmit = async () => {
    if (
      !formData.gameId ||
      !formData.playerName ||
      !formData.serverId ||
      !formData.phone ||
      !formData.package
    ) {
      toast.error("សូមបំពេញព័ត៌មានឱ្យគ្រប់");
      return;
    }

    if (formData.phone.length < 8) {
      toast.error("Phone number is invalid");
      return;
    }

    if (!screenshot) {
      toast.error("Upload Payment Screenshot");
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

      
      console.log("Submitting package:", formData.package);

for (const [key, value] of form.entries()) {
  console.log(key, value);
}

     const data = await createOrder(form);

      if (data.success) {
        const audio = new Audio(
          "/sounds/notification.mp3"
        );

        audio.play().catch(console.error);

        toast.success(
          "Order submitted successfully!"
        );

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
        toast.error(
          data.error || "Failed to submit order"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}