"use server"
import { Provider } from "@supabase/supabase-js";
import { serverside } from "../../../../config/serverside";

export async function SignIn(provider: Provider) {
    const { data, error } = await serverside.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "http://mesaconnect.io/auth/callback",
        },
      });

      
  return { data, error };
}