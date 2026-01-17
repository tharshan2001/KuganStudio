// src/app/admin/layout.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const user = await verifyToken();

  if (!user) redirect("/login");

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">Admin Header</header>
      <main className="p-4">{children}</main>
    </div>
  );
}