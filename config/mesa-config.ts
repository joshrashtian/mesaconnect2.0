import { createClient } from "@supabase/supabase-js";

export const config = {
  title: "MESA Connect",
  description: "STEM, but united.",
  versionNumber: "0.0.1 alpha",
};

//Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
