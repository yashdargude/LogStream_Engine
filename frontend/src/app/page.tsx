"use client";

import Link from "next/link";
import Navbar from "../components/ui/navbar-menu";
import BackgroundDots from "../components/ui/BackgroundDots";

import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { Cover } from "../components/ui/cover";
import CompanyInfo from "@/components/CompanyInfo";
import Hero from "@/components/HeroSection";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import UserProfileDropdown from "../components/UserProfileBox";
export default function Home() {
  const user = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Hero />
      <CompanyInfo />
    </>
  );
}
