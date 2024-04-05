"use server";
import Dock from "@/_components/navigation";
import React, { useContext, useRef, useState } from "react";
import { useUser } from "../AuthContext";
import InfoContextContainer from "./InfoContext";
import { config } from "../../../config/mesa-config";
import EventModal from "../EventModal";
import { serverside } from "../../../config/serverside";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await serverside.auth.getSession();

  if (!session.data.session?.user) {
    console.log("user not logged in");
  }

  return (
    <InfoContextContainer>
      <EventModal>
        <main className="p-16 h-screen">
          <Dock />

          {children}
          <h1 className="fixed bottom-2 right-2 font-mono">
            {config.versionNumber}
          </h1>
        </main>
      </EventModal>
    </InfoContextContainer>
  );
};

export default Layout;
