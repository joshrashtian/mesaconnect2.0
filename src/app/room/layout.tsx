"use server";
import React from "react";
import RoomContextProvider from "./RoomContext";
import { serverside } from "../../../config/serverside";

const RoomLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await serverside.auth.getSession();

  return <RoomContextProvider>{children}</RoomContextProvider>;
};

export default RoomLayout;
