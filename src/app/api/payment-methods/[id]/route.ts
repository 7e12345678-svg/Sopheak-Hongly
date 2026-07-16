import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PaymentMethod from "@/models/PaymentMethod";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const form = await req.formData();

    const accountName = String(form.get("accountName") || "");
    const accountNumber = String(form.get("accountNumber") || "");
    const enabled = form.get("enabled") === "true";

    const updateData: Record<string, unknown> = {
      accountName,
      accountNumber,
      enabled,
    };

    async function uploadImage(file: File | null) {
      if (!file) return null;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "payment-methods",
              },
              (err, result) => {
                if (err || !result) {
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            )
            .end(buffer);
        }
      );
    }

    const logoFile = form.get("logo") as File | null;
    const qrFile = form.get("qr") as File | null;

    const logo = await uploadImage(logoFile);

    if (logo) {
      updateData.logo = logo.secure_url;
    }

    const qr = await uploadImage(qrFile);

    if (qr) {
      updateData.qr = qr.secure_url;
    }

    const method =
      await PaymentMethod.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      method,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}