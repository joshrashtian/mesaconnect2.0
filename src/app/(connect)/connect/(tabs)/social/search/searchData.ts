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
  const users = await SearchUsers(search);
  const communities = await SearchCommunities(search);
  //@ts-ignore
  const final = [...data, ...events, ...users, ...communities];
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

export const SearchUsers = async (search: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, major, real_name, avatar_url, college")
    .textSearch("username", `${search}`, {
      type: "websearch",
      config: "english",
    });

  if (error) {
    console.log(error);
    return;
  }

  return [...data];
};

export const SearchCommunities = async (search: string) => {
  const { data, error } = await supabase
    .from("communities")
    .select("id, name, primary_campus, members, description")
    .textSearch("id", `${search}`, {
      type: "websearch",
      config: "english",
    });

  if (error) {
    console.log(error);
    return;
  }

  return [...data];
};
