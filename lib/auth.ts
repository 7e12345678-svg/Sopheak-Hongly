import { cookies } from "next/headers";
import { verifyToken } from "./token";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return await verifyToken(token);
}