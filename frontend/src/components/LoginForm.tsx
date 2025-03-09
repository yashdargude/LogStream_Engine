"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import UserProfileDropdown from "./UserProfileBox";
import useAuth from "@/hooks/useAuth";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleOAuthLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
  };

  return (
    <>
      <div className="w-full h-150  bg-black">
        <div className="fixed top-4 right-4 z-50">
          <UserProfileDropdown user={user} />
        </div>
        <motion.div
          className="max-w-md  mx-auto mt-16 p-8 bg-white shadow-xl rounded-2xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOAuthLogin("github")}
              className="w-full bg-black hover:bg-gray-900 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              <FaGithub size={20} />
              <span>Login with GitHub</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOAuthLogin("google")}
              className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              <FcGoogle size={20} />
              <span>Login with Google</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
