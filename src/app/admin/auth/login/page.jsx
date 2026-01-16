// app/admin/auth/login/page.jsx
import { cookies } from "next/headers";
import AdminLoginPage from "@/components/admin/AdminLoginPage";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function LoginPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // If token exists and is valid, redirect to admin dashboard
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      // Server-side redirect
      return (
        <redirect href="/admin/frames" />
      );
    } catch (err) {
      // Token invalid → show login page
      console.log("Invalid token, show login");
    }
  }

  return <AdminLoginPage />;
}