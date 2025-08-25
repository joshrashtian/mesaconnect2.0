"use client";

import React, { useEffect } from "react";
import { useKioskMode } from "@/_contexts/KioskModeContext";
import { isKioskApp } from "@/lib/kiosk-config";

const KioskApp = () => {
  const { activateKioskMode, isKioskMode } = useKioskMode();

  // Auto-activate kiosk mode when this is the kiosk app
  useEffect(() => {
    if (isKioskApp() && !isKioskMode) {
      activateKioskMode("default");
    }
  }, [activateKioskMode, isKioskMode]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">MESA Kiosk</h1>
        <p className="text-xl text-gray-300">
          Welcome to the MESA Connect Kiosk System
        </p>

        {isKioskMode && (
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-300" />
              <span className="font-medium">Kiosk Mode Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KioskApp;
