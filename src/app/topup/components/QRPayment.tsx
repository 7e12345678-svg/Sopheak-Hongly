"use client";

import Image from "next/image";

const qrImages = {
  ABA: "/images/aba.jpg",
  Wing: "/images/wing.jpg",
  ACLEDA: "/images/acleda.jpg",
  AMK: "/images/amk.jpg",
};

interface Props {
  payment: string;
}

export default function QRPayment({
  payment,
}: Props) {
  return (
    <div className="mb-8 text-center">
      <p className="mb-4 text-gray-300">
        Scan this QR before submitting your order.
      </p>

      <Image
        src={qrImages[payment as keyof typeof qrImages]}
        alt={payment}
        width={220}
        height={220}
        className="mx-auto rounded-xl object-contain"
      />
    </div>
  );
}