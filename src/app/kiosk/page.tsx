"use client";
import React, { useEffect, useState } from "react";
import { Golos_Text } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LoginKiosk from "./login";
import { useUser } from "../AuthContext";
import LoadingObject from "@/(mesaui)/LoadingObject";
import KioskMenu from "./kioskmenu";
import { useModal } from "../(connect)/connect/Modal";

// Add CSS to prevent scrolling
const kioskStyles = `
  body {
    overflow: hidden !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  html {
    overflow: hidden !important;
    height: 100vh !important;
  }
`;

const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const KioskHandlerContent = () => {
  const { user, signOut } = useUser();

  const modal = useModal();

  // Apply kiosk styles to prevent scrolling
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = kioskStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden pt-16">
      {user ? (
        <div className="mt-8 flex w-full flex-col items-start justify-start px-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome,{" "}
            {user.user_metadata.real_name || user.user_metadata.full_name}
          </h1>

          <KioskMenu />
        </div>
      ) : (
        <LoginKiosk />
      )}
    </div>
  );
};

const KioskHandler = () => {
  return <KioskHandlerContent />;
};

export default KioskHandler;
