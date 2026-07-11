import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { hashPassword } from "@/lib/hash";

export async function GET() {
  try {

    await connectDB();

const admins = await Admin.find();

console.log("ALL ADMINS");
console.log(admins);

const exists = await Admin.findOne({
  username: "admin",
});

console.log("EXISTS");
console.log(exists);

    if (exists) {
      return NextResponse.json({
        success: false,
        message: "Admin already exists",
      });
    }

    const password = await hashPassword("admin123");

    await Admin.create({
      username: "admin",
      password,
      role: "superadmin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin Created Successfully",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}