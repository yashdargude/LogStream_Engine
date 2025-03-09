import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ FIX: Ensure the variables are defined, else throw an error
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase URL or Anon Key. Please check your .env file."
  );
}

// ✅ FIX: Pass them as strings (No More Type Error)
export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);
