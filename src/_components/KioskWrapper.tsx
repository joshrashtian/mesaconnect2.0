import KioskModeProviderWithSuspense from "./KioskModeProvider";
import React from "react";
import KioskHeader from "./KioskHeader";

const KioskWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <KioskModeProviderWithSuspense>
      <KioskHeader />
      {children}
    </KioskModeProviderWithSuspense>
  );
};

export default KioskWrapper;
