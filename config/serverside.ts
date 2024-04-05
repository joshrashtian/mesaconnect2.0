import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const serverside = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
    },
  }
);

export const useSession = async () => {
  const { data, error } = await serverside.auth.getSession();
  let session = data.session;
  return { session, error };
};
