"use client";

import Image from "next/image";

interface Props {
  payment: string;
}

const logos: Record<string, string> = {
  ABA: "/payments/aba.png",
  Wing: "/payments/wing.png",
  ACLEDA: "/payments/acleda.png",
  AMK: "/payments/amk.png",
};

export default function PaymentBadge({
  payment,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={
          logos[payment] ??
          "/payments/default.png"
        }
        alt={payment}
        width={30}
        height={30}
        className="rounded-lg"
      />

      <span>{payment}</span>
    </div>
  );
}