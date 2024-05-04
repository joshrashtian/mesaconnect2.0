"use server"
import { serverside } from "../../../../../../../config/serverside";

export async function intfetch(range: number) {
      const { data, error } = await serverside
        .from("posts")
        .select("*", { count: "exact" })
        .range(range, range + 10)
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error);
      }
      return { data, error }
    }

export async function getFollowed() {
    const { data, error } = await serverside
     .rpc("get_followed_feed")
    if (error) {
      console.error(error);
    }
    return { data, error };
  
}