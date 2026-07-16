"use client";

import Image from "next/image";

interface Props {
  preview: string;
  onSelect: (file: File) => void;
}

export default function LogoUploader({
  preview,
  onSelect,
}: Props) {
  return (
    <div>
      <p className="mb-3 font-semibold">
        Logo
      </p>

      <div className="space-y-3">

        {preview ? (
          <Image
            src={preview}
            alt="Logo"
            width={90}
            height={90}
            className="rounded-xl border border-slate-700"
          />
        ) : (
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-slate-600
              text-slate-500
            "
          >
            No Logo
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