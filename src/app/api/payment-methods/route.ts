import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PaymentMethod from "@/models/PaymentMethod";

// ================= GET =================
export async function GET() {
  try {
    await connectDB();

    const methods = await PaymentMethod.find(
  {},
  {
    name: 1,
    logo: 1,
    qr: 1,
    accountName: 1,
    accountNumber: 1,
    enabled: 1,
  }
).sort({
  name: 1,
});

    return NextResponse.json({
      success: true,
      methods,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load payment methods",
      },
      {
        status: 500,
      }
    );
  }
}
    // ================= POST =================
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const method = await PaymentMethod.create({
      name: body.name,
      logo: body.logo || "",
      qr: body.qr || "",
      accountName: body.accountName || "",
      accountNumber: body.accountNumber || "",
      enabled: body.enabled ?? true,
    });

    return NextResponse.json({
      success: true,
      method,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create payment method",
      },
      {
        status: 500,
      }
    );
  }
}