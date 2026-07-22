import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  try {
    console.log("===== ADMIN LOGIN API CALLED =====");

    await connectDB();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username });

    console.log("ADMIN:", admin?.username);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    const valid = await comparePassword(password, admin.password);

    console.log("PASSWORD VALID:", valid);

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    const token = await signToken({
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    });

    console.log("TOKEN CREATED");

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: false, // localhost
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log(
      "SET COOKIE:",
      response.headers.get("set-cookie")
    );

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}