"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { EvervaultCard, Icon } from "./ui/evervault-card";
import ProjectGrid from "./ProjectGrid";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "../components/ui/glowing-effect";
import { LampContainer } from "./ui/lamp";
export default function CompanyInfo() {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900 text-gray-900 dark:text-white">
      <BackgroundBeamsWithCollision className="absolute inset-0 bg-black z-0" />

      {/* Hero Section */}
      <section className="relative h-full flex flex-col items-center justify-center bg-black text-white text-center p-6">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Endless Possibilities <br /> at Your Fingertips
          </motion.h1>
          <motion.h6 className="mt-2 text-lg max-w-3xl mx-auto">
            We serve to build functional products and scale your team at a rapid
            pace.
          </motion.h6>
        </LampContainer>
      </section>

      {/* Projects */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Projects We Shipped
        </h2>
        <ProjectGrid />
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 max-w-7xl mx-auto text-center text-white">
        <h2 className="text-3xl font-semibold">Need Tech Talents?</h2>
        <p className="mt-2">Looking to scale your team? We are here to help.</p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Connect with Us
        </Link>
      </section>

      {/* Open Source Contributions */}
      <section className="py-12 px-6 max-w-7xl mx-auto text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Open Source Contributions
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Flask", "React", "Node.js", "TensorFlow", "Django", "MongoDB"].map(
            (tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 text-black dark:bg-gray-700 rounded-lg"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
