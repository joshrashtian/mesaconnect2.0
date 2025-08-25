"use client";

import React from "react";
import { KioskModeProvider as BaseKioskModeProvider } from "@/_contexts/KioskModeContext";

// Simple wrapper component
const KioskModeProviderWithSuspense = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <BaseKioskModeProvider>{children}</BaseKioskModeProvider>;
};

export default KioskModeProviderWithSuspense;
