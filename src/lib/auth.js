// src/lib/auth.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken() {
  try {
    console.log("verifyToken called");
    
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET is not set!");
      return null;
    }
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    console.log("Token from cookies:", token ? "Exists" : "Missing");
    
    if (!token) {
      console.log("❌ No token found in cookies");
      return null;
    }

    console.log("Verifying token...");
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token verified successfully for user:", decoded.email);
    
    return decoded;
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return null;
  }
}