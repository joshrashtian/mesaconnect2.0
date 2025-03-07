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
const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const KioskHandler = () => {
  const { user, signOut } = useUser();

  const modal = useModal();

  useEffect(() => {
    modal.CreateModal(
      <div className="flex flex-col items-center justify-center gap-4">
        <p>
          Hello! Welcome to our MESAKiosk, a branch and part of the MESAConnect
          Exprience! Please be aware we are currently in pre-alpha and new
          features are being added frequently!{" "}
        </p>
        <Button onClick={() => modal.DisarmModal()}>Close</Button>
      </div>,
    );
  }, []);

  return (
    <div
      className={`font-nenue flex h-screen w-screen flex-col items-start justify-end p-12`}
    >
      <h1 className={`${font.className} text-9xl font-black text-orange-300`}>
        MESA<span className="text-white">Kiosk</span>
      </h1>
      {user ? (
        <div className="flex w-full flex-col items-start justify-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome,{" "}
            {user.user_metadata.real_name || user.user_metadata.full_name}
          </h1>
          <ol className="flex flex-row gap-2">
            <Button variant="outline">Events</Button>
            <Button variant="outline">Rooms</Button>
          </ol>
          <KioskMenu />
        </div>
      ) : (
        <LoginKiosk />
      )}
    </div>
  );
};

export default KioskHandler;
