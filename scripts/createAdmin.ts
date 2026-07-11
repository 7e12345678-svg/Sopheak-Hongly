import "dotenv/config";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { hashPassword } from "@/lib/hash";

async function createAdmin() {
  try {
    await connectDB();

    const exists = await Admin.findOne({
      username: "admin",
    });

    if (exists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const password = await hashPassword("admin123");

    await Admin.create({
      username: "admin",
      password,
      role: "superadmin",
    });

    console.log("🎉 Admin created successfully");
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();