// src/app/auth/new-password/actions.ts
"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const updatePassword = async (newPassword: string) => {
  // this client will pick up the HTTP-only Supabase cookies
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Supabase updateUser error:", error);
    return { success: "", error: error.message };
  }

  return { success: "Password updated successfully", error: "" };
};
