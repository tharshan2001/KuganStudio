// app/admin/page.jsx
import { verifyToken } from "@/lib/auth";

export default async function AdminDashboard() {
  const user = await verifyToken();
  
  console.log("Dashboard user:", user);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600 mt-2">
        Welcome, {user?.email || "Guest"}
      </p>
      
      {user ? (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <p className="text-green-700">✅ Authenticated as: {user.email}</p>
          <p className="text-sm text-green-600 mt-1">User ID: {user.id}</p>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-red-50 rounded">
          <p className="text-red-700">❌ Not authenticated</p>
        </div>
      )}
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Debug Info:</h2>
        <pre className="mt-2 p-3 bg-gray-100 rounded text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}