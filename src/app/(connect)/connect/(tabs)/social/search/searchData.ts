"use server";

import { supabase } from "../../../../../../../config/mesa-config";

export const SearchPosts = async (search: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .textSearch('title', `${search}`, {
        type: 'websearch',
        config: 'english'
    })
    .order('created_at', {ascending: false})
    //.or(`tags.cs.{${search}},title.like.${search}`)
  
  if (error) {
    console.log(error);
    return;
  }

  return data;
};
