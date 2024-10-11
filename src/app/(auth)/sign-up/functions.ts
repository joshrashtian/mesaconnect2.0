"use server"

import { serverside } from "../../../../config/serverside";

export async function SignUpUser(email: string, password: string, college?: string, major?: string) {
  const { data, error } = await serverside.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        college: college,
        major: major,
      },
      emailRedirectTo: "https://mesaconnect.io",
    },
  });

  return { data, error };

}