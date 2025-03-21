"use server"
import { serverside } from "../../../../../../../config/serverside";

export async function intfetch(range: number, globalCount: number) {
  let number = range === 0 ? range + 7 : ( range + 7 >= globalCount ? globalCount - range : range + 7 );
  console.log({
    range,
    number,
    globalCount,
  });
  
      const { data, count, error } = await serverside
        .from("posts")
        .select("*", { count: "exact" })
        .range(range, range + number)
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error);
      }
      return { data, count, error }
    }

export async function getFollowed() {
    const { data, error } = await serverside
     .rpc("get_followed_feed")
    if (error) {
      console.error(error);
    }
    return { data, error };
  
}

export const byTag = async (search: string) => {

  const { data, error } = await serverside
    .from("posts")
    .select()
    .textSearch("title_tags_creator", `${search}`, {
      type: "websearch",
      config: "english",
    })
    .order("created_at", { ascending: false });
  //.or(`tags.cs.{${search}},title.like.${search}`)

  if (error) {
    console.log(error);
  }

  return { data, error };
};

