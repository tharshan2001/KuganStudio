"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-black text-white p-4">
      <h2 className="font-bold text-lg mb-6">Admin</h2>

      <nav className="space-y-2">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/frames">Frames</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>
    </aside>
  );
}