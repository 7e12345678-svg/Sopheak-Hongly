import { cookies } from "next/headers";
import { verifyToken } from "./token";

export async function requireAdmin() {
  const cookieStore = await cookies();

  console.log("========== COOKIES ==========");
  console.log(cookieStore.getAll());

  const token = cookieStore.get("admin_token")?.value;

  console.log("TOKEN =", token);

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyToken(token);

  console.log("PAYLOAD =", payload);

  return payload;
}