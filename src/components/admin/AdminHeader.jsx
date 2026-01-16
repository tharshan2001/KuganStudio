export default function AdminHeader({ user }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <span>Welcome, {user.email}</span>
    </header>
  );
}