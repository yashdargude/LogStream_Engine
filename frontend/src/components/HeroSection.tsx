"use client";

import Link from "next/link";
import Navbar from "../components/ui/navbar-menu";
import BackgroundDots from "../components/ui/BackgroundDots";

import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { Cover } from "../components/ui/cover";
import CompanyInfo from "@/components/CompanyInfo";
import { Dock } from "./Dock";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import UserProfileDropdown from "./UserProfileBox";
export default function Hero() {
  const user = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Sticky Logo */}
      <div className="fixed top-4 left-4 z-50">
        <img
          src="https://cybersapient.io/wp-content/uploads/2023/02/cybersapient_light.png"
          alt="Cybersapient Logo"
          className="h-12 md:h-16" // Adjust size as needed
        />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <UserProfileDropdown user={user} />
      </div>

      <div className="relative h-screen bg-black overflow-hidden z-2">
        <BackgroundBeamsWithCollision className="absolute inset-0 bg-black z-1" />

        <div className="relative z-10">
          <Navbar />

          <motion.h1
            className="text-4xl font-bold text-center mt-12 pt-20  text-amber-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Log Stream Engine
          </motion.h1>

          <div>
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-semibold   max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Capture, analyze, and optimize logs <br /> at{" "}
              <Cover>light speed</Cover>
            </h1>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/dashboard">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Go to Dashboard
                  </span>
                </button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  <Link href="/upload">Go to Upload Page</Link>
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
