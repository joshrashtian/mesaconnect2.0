import { serverside } from "../../config/serverside";

export async function grabUser() {
  const { data, error } = await serverside
    .from("profiles")
    .select("*")
    .eq("id", (await serverside.auth.getUser()).data.user?.id);
  return data;
}