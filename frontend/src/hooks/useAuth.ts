"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ Step 1: Check The Current Session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // ✅ Step 2: Redirect if not authenticated
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    };
    getSession();

    // ✅ Step 3: Listen To Auth Changes (Corrected)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/login");
        } else {
          setUser(session.user);
        }
      }
    );

    // ✅ Step 4: Prevent Memory Leaks (Corrected)
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return user;
}