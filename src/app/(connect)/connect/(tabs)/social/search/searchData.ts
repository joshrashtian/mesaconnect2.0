"use server";

import { supabase } from "../../../../../../../config/mesa-config";

export const SearchPosts = async (search: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .textSearch("title_tags_creator", `${search}`, {
      type: "websearch",
      config: "english",
    });
  //.or(`tags.cs.{${search}},title.like.${search}`)

  if (error) {
    console.log(error);
    return;
  }

  const events = await SearchEvents(search);
  const final = [...data, ...events];
  return final;
};

export const SearchEvents = async (search: string) => {
  const { data, error } = await supabase
    .from("events")
    .select()
    .textSearch("event_search", `${search}`, {
      type: "websearch",
      config: "english",
    })
    .order("created_at", { ascending: false });
  //.or(`tags.cs.{${search}},title.like.${search}`)

  if (error) {
    console.log(error);
    return;
  }

  const final = [...data];
  return final;
};
