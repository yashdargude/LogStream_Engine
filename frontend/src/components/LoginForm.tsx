"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
  };

  const handleOAuthLogin = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Email & Password Login */}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
        >
          Login
        </button>
      </form>

      {/* OAuth Login Options */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => handleOAuthLogin("github")}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white p-2 rounded flex items-center justify-center transition"
        >
          <span className="mr-2">🔗</span> Login with GitHub
        </button>

        <button
          onClick={() => handleOAuthLogin("google")}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center justify-center transition"
        >
          <span className="mr-2">📧</span> Login with Google
        </button>
      </div>
    </div>
  );
}
