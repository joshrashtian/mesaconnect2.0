"use server";

import { Room } from "../../RoomContext";
import { serverside } from "../../../../../config/serverside";

export const updateRoom = async (id: string, updated: any) => {
  const { data, error } = await serverside
    .from("room")
    .update({
      ...updated,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  } 

  return { data, error };
};
