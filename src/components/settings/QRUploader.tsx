"use client";

import Image from "next/image";

interface Props {
  preview: string;
  onSelect: (file: File) => void;
}

export default function QRUploader({
  preview,
  onSelect,
}: Props) {
  return (
    <div>
      <p className="mb-3 font-semibold">
        QR Code
      </p>

      <div className="space-y-3">

        {preview ? (
          <Image
            src={preview}
            alt="QR Code"
            width={130}
            height={130}
            className="rounded-xl border border-slate-700"
          />
        ) : (
          <div
            className="
              flex
              h-32
              w-32
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-slate-600
              text-slate-500
            "
          >
            No QR
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            onSelect(file);
          }}
          className="block w-full text-sm"
        />

      </div>
    </div>
  );
}