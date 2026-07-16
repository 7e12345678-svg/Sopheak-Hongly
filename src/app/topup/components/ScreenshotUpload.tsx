"use client";

import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
  preview: string;
  setPreview: (v: string) => void;
  setScreenshot: (f: File) => void;
}

export default function ScreenshotUpload({
  preview,
  setPreview,
  setScreenshot,
}: Props) {
  return (
    <div className="mb-8">
      <label className="mb-3 block font-semibold">
        Upload Screenshot
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          if (file.size > 5 * 1024 * 1024) {
            toast.error("Max 5MB");
            return;
          }

          setScreenshot(file);

          setPreview(
            URL.createObjectURL(file)
          );
        }}
      />

      {preview && (
        <div className="mt-5 flex justify-center">
          <Image
            src={preview}
            alt="Preview"
            width={220}
            height={220}
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
}