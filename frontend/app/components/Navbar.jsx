'use client';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-center items-center gap-6 p-4">
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      {!user ? (
        <Link href="/login">Login</Link>
      ) : (
        <button className="cursor-pointer" onClick={logout}>Logout</button>
      )}
    </nav>
  );
}