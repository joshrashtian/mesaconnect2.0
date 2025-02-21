"use server";
import React from "react";
import RoomContextProvider from "./RoomContext";
import { serverside } from "../../../config/serverside";
import { redirect } from "next/navigation";

const RoomLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await serverside.auth.getUser();

  return <RoomContextProvider>{children}</RoomContextProvider>;
};

export default RoomLayout;
