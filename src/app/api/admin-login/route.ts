import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/token";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, password } = await req.json();

    // Find admin by username
    const admin = await Admin.findOne({ username });

    console.log("===== ADMIN =====");
console.log(admin);


    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    
    

    // Compare password with bcrypt hash
    const valid = await comparePassword(password, admin.password);

console.log("===== VALID =====");
console.log(valid);


    console.log("Password Valid:", valid);

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    // Create JWT
    const token = await signToken({
  id: admin._id,
  username: admin.username,
  role: admin.role,
});

console.log("TOKEN =", token);

const response = NextResponse.json({
  success: true,
  user: {
    username: admin.username,
    role: admin.role,
  },
});

response.cookies.set("admin_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24,
});

console.log("COOKIE CREATED");

return response;
  } catch (error) {
    console.error("Admin Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}