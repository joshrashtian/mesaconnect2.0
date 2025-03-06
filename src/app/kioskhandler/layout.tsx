"use server";

import React from "react";
import InfoContextContainer from "../(connect)/InfoContext";
import HeaderMenu from "./header";
const LayoutKioskHandler = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={`flex h-screen w-screen flex-col bg-zinc-600`}>
      <HeaderMenu />
      <InfoContextContainer>{children}</InfoContextContainer>
    </div>
  );
};

export default LayoutKioskHandler;
