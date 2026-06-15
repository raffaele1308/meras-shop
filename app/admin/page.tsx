"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");

    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === "rm100817") {
      localStorage.setItem("admin-auth", "true");

      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password non corretta");
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin-auth");

    setIsAuthenticated(false);
    setPassword("");
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

          <h1 className="text-3xl font-serif text-center mb-2">
            Area Admin
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Inserisci la password per continuare
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c7a384]"
            />

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#c7a384] text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Accedi
            </button>

          </form>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-serif">
              Dashboard Admin
            </h1>

            <p className="text-gray-500 mt-2">
              Gestisci i prodotti di MeRà's Shop
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Esci
          </button>

        </div>

        <AdminDashboard />

      </div>

    </main>
  );
}