"use server";

import React from "react";
import InfoContextContainer from "../(connect)/InfoContext";
import HeaderMenu from "./header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ModalProvider from "../(connect)/connect/Modal";
import DeviceContextProvider from "./DeviceContext";

let colors = ["#295270", "#524175", "#243748"];
// Animated gradient styles
const animatedGradientStyles = `
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .animated-gradient {
    background: linear-gradient(-45deg, ${colors});
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
  }
`;

const LayoutKioskHandler = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animatedGradientStyles }} />
      <div className="animated-gradient kiosk-mode flex flex-col">
        <ModalProvider>
          <DeviceContextProvider>
            <div className="kiosk-content">
              <InfoContextContainer>{children}</InfoContextContainer>
            </div>
          </DeviceContextProvider>
        </ModalProvider>
      </div>
    </>
  );
};

export default LayoutKioskHandler;
