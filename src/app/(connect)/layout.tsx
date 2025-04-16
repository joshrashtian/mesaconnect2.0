"use server";
import Dock from "@/_components/navigation";
import React from "react";
import InfoContextContainer from "./InfoContext";
import { config } from "../../../config/mesa-config";
import EventModal from "../EventModal";
import { redirect } from "next/navigation";
import ModalProvider from "./connect/Modal";
import { UserCheck } from "./UserCheck";
import { serverside } from "../../../config/serverside";
import { InfoProvide } from "./connect/(profiles)/profile/[id]/(infoblockscreator)/InfoBlockDashboard";
import { MultiStepProvider } from "./connect/MutliStepContext";
import { createClient } from "../../../config/server";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const serverside = await createClient();

  if (await !serverside.auth.getUser()) {
    redirect("/sign-in");
  }

  return (
    <InfoContextContainer>
      <InfoProvide>
        <UserCheck>
          <ModalProvider>
            <MultiStepProvider>
              <EventModal>
                <main className="h-screen p-16 font-eudoxus">
                  <Dock />

                  {children}
                  <h1 className="fixed bottom-2 right-2 font-eudoxus font-black">
                    {config.versionNumber}
                  </h1>
                </main>
              </EventModal>
            </MultiStepProvider>
          </ModalProvider>
        </UserCheck>
      </InfoProvide>
    </InfoContextContainer>
  );
};

export default Layout;
