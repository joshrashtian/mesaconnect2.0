import { KioskModeProvider } from "@/_contexts/KioskModeContext";
import React from "react";
import KioskHeader from "./KioskHeader";

const KioskWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <KioskModeProvider>
      <KioskHeader />
      {children}
    </KioskModeProvider>
  );
};

export default KioskWrapper;
