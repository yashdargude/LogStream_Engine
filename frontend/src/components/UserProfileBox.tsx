"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

import { useRouter } from "next/navigation";

export default function UserProfileDropdown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <motion.div
      className="absolute top-1 right-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={
                user?.user_metadata?.avatar_url ||
                "https://via.placeholder.com/40"
              }
            />
            <AvatarFallback>
              {user?.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 shadow-lg rounded-lg">
          <div className="px-4 py-2 text-sm text-gray-700">
            <p className="font-medium">{user?.user_metadata?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-500 text-sm cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
