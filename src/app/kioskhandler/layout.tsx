"use server";

import React from "react";
import InfoContextContainer from "../(connect)/InfoContext";
import HeaderMenu from "./header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ModalProvider from "../(connect)/connect/Modal";
import DeviceContextProvider from "./DeviceContext";

const LayoutKioskHandler = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex h-screen w-screen flex-col bg-gradient-to-b from-zinc-900 to-zinc-800`}
    >
      <ModalProvider>
        <DeviceContextProvider>
          <HeaderMenu />
          <InfoContextContainer>{children}</InfoContextContainer>
        </DeviceContextProvider>
      </ModalProvider>
    </div>
  );
};

export default LayoutKioskHandler;
