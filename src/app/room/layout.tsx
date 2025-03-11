"use server";
import React from "react";
import RoomContextProvider from "./RoomContext";
import { serverside } from "../../../config/serverside";
import { redirect } from "next/navigation";
import ModalProvider from "../(connect)/connect/Modal";
import HeaderMenu from "../kioskhandler/header";

const RoomLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomContextProvider>
      <ModalProvider>{children}</ModalProvider>
    </RoomContextProvider>
  );
};

export default RoomLayout;
