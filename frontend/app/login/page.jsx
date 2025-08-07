'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error("Login fehlgeschlagen");
      }

      const data = await res.json();

      if (data && data.username) {
        login(data); // speichert den User im Context
        router.push("/dashboard");
      } else {
        setError("Ungültige Zugangsdaten");
      }
    } catch (err) {
      console.error(err);
      setError("Fehler beim Login. Bitte erneut versuchen.");
    }
  };

  return (
    <div className="flex justify-center mt-8">
      
      <form onSubmit={loginHandler}>
        <h1 className='text-2xl text-blue-900 font-bold my-4'>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
          required
        /><br /><br />
        <button className="border-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-l p-1 cursor-pointer text-xl w-[7rem]" type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
