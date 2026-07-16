import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PaymentMethod from "@/models/PaymentMethod";

export async function GET() {
  try {
    await connectDB();

    const count = await PaymentMethod.countDocuments();

    if (count === 0) {
      await PaymentMethod.insertMany([
        {
          name: "ABA",
          logo: "",
          qr: "",
          accountName: "Z-Store",
          accountNumber: "001234567",
          enabled: true,
        },
        {
          name: "Wing",
          logo: "",
          qr: "",
          accountName: "Z-Store",
          accountNumber: "001234568",
          enabled: true,
        },
        {
          name: "ACLEDA",
          logo: "",
          qr: "",
          accountName: "Z-Store",
          accountNumber: "001234569",
          enabled: true,
        },
        {
          name: "AMK",
          logo: "",
          qr: "",
          accountName: "Z-Store",
          accountNumber: "001234570",
          enabled: true,
        },
      ]);
    }

    return NextResponse.json({
      success: true,
      message: "Payment methods created.",
    });
  } catch (error) {
    console.error(error);

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