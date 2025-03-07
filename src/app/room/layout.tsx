"use server";
import React from "react";
import RoomContextProvider from "./RoomContext";
import { serverside } from "../../../config/serverside";
import { redirect } from "next/navigation";
import ModalProvider from "../(connect)/connect/Modal";

const RoomLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await serverside.auth.getUser();

  return (
    <RoomContextProvider>
      <ModalProvider>{children}</ModalProvider>
    </RoomContextProvider>
  );
};

export default RoomLayout;
