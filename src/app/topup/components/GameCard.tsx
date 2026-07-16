"use client";

import Image from "next/image";

interface Props {
  image: string;
  name: string;
}

export default function GameCard({
  image,
  name,
}: Props) {
  return (
    <>
      <div className="flex justify-center mb-8">
        <Image
          src={image}
          alt={name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-2xl object-cover shadow-xl"
        />
      </div>

      <h1 className="mb-8 rounded-xl bg-slate-800 p-4 text-center text-2xl font-bold">
        {name} Top Up
      </h1>
    </>
  );
}