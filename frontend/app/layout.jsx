'use client';
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <AuthProvider>
          <header className="flex flex-col justify-center items-center bg-blue-900 text-white pt-8">
            <h1 className="text-2xl font-bold">Fullstack Project</h1>
            <Navbar />
          </header>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}