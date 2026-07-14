import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB() {
  console.log("MONGODB_URI exists:", !!MONGODB_URI);

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    console.log("Connecting...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Error:", err);
    throw err;
  }
}