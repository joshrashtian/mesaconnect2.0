"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface KioskModeContextType {
  isKioskMode: boolean;
  kioskType: "default" | "spotify" | "zoom" | "custom";
  externalApps: {
    spotify: {
      enabled: boolean;
      url: string;
    };
    zoom: {
      enabled: boolean;
      url: string;
    };
  };
  kioskSettings: {
    autoRefresh: boolean;
    fullscreen: boolean;
    disableNavigation: boolean;
    customTheme: string;
  };
  activateKioskMode: (type?: "default" | "spotify" | "zoom" | "custom") => void;
  deactivateKioskMode: () => void;
  openExternalApp: (app: "spotify" | "zoom") => void;
  updateKioskSettings: (
    settings: Partial<KioskModeContextType["kioskSettings"]>,
  ) => void;
}

const KioskModeContext = createContext<KioskModeContextType>({
  isKioskMode: false,
  kioskType: "default",
  externalApps: {
    spotify: {
      enabled: false,
      url: "https://open.spotify.com",
    },
    zoom: {
      enabled: false,
      url: "https://zoom.us",
    },
  },
  kioskSettings: {
    autoRefresh: false,
    fullscreen: false,
    disableNavigation: false,
    customTheme: "default",
  },
  activateKioskMode: () => {},
  deactivateKioskMode: () => {},
  openExternalApp: () => {},
  updateKioskSettings: () => {},
});

export const KioskModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isKioskMode, setIsKioskMode] = useState(false);
  const [kioskType, setKioskType] = useState<
    "default" | "spotify" | "zoom" | "custom"
  >("default");

  const router = useRouter();

  const [externalApps, setExternalApps] = useState({
    spotify: {
      enabled: true,
      url: "https://app.zoom.us/wc",
    },
    zoom: {
      enabled: true,
      url: "https://zoom.us",
    },
  });

  const [kioskSettings, setKioskSettings] = useState({
    autoRefresh: false,
    fullscreen: false,
    disableNavigation: false,
    customTheme: "default",
  });

  // Check URL parameters for kiosk mode activation
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const kioskParam = urlParams.get("kiosk");
      const kioskTypeParam = urlParams.get("kioskType");

      if (kioskParam === "true" || kioskParam === "1") {
        activateKioskMode(
          (kioskTypeParam as "default" | "spotify" | "zoom" | "custom") ||
            "default",
        );
      } else if (kioskParam === "false" || kioskParam === "0") {
        deactivateKioskMode();
      }
    } catch (error) {
      console.warn("Failed to parse URL parameters:", error);
    }
  }, []);

  // Load kiosk settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("kioskSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setKioskSettings((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Failed to parse kiosk settings:", error);
      }
    }

    const savedApps = localStorage.getItem("kioskExternalApps");
    if (savedApps) {
      try {
        const parsed = JSON.parse(savedApps);
        setExternalApps((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Failed to parse external apps settings:", error);
      }
    }
  }, []);

  // Handle fullscreen mode
  useEffect(() => {
    if (kioskSettings.fullscreen && isKioskMode) {
      const enterFullscreen = async () => {
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          }
        } catch (error) {
          console.error("Failed to enter fullscreen:", error);
        }
      };
      enterFullscreen();
    }
  }, [kioskSettings.fullscreen, isKioskMode]);

  // Handle auto-refresh
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    if (kioskSettings.autoRefresh && isKioskMode) {
      refreshInterval = setInterval(() => {
        window.location.reload();
      }, 300000); // 5 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [kioskSettings.autoRefresh, isKioskMode]);

  const activateKioskMode = (
    type: "default" | "spotify" | "zoom" | "custom" = "default",
  ) => {
    setIsKioskMode(true);
    setKioskType(type);

    // Update URL without triggering navigation
    const url = new URL(window.location.href);
    url.searchParams.set("kiosk", "true");
    url.searchParams.set("kioskType", type);
    window.history.replaceState({}, "", url.toString());
  };

  const deactivateKioskMode = () => {
    setIsKioskMode(false);
    setKioskType("default");

    // Update URL without triggering navigation
    const url = new URL(window.location.href);
    url.searchParams.delete("kiosk");
    url.searchParams.delete("kioskType");
    window.history.replaceState({}, "", url.toString());

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const openExternalApp = (app: "spotify" | "zoom") => {
    const appConfig = externalApps[app];
    if (appConfig.enabled) {
      window.open(appConfig.url, "_blank", "noopener,noreferrer");
    }
  };

  const updateKioskSettings = (
    settings: Partial<KioskModeContextType["kioskSettings"]>,
  ) => {
    const newSettings = { ...kioskSettings, ...settings };
    setKioskSettings(newSettings);
    localStorage.setItem("kioskSettings", JSON.stringify(newSettings));
  };

  const updateExternalApps = (apps: Partial<typeof externalApps>) => {
    const newApps = { ...externalApps, ...apps };
    setExternalApps(newApps);
    localStorage.setItem("kioskExternalApps", JSON.stringify(newApps));
  };

  return (
    <KioskModeContext.Provider
      value={{
        isKioskMode,
        kioskType,
        externalApps,
        kioskSettings,
        activateKioskMode,
        deactivateKioskMode,
        openExternalApp,
        updateKioskSettings,
      }}
    >
      {children}
    </KioskModeContext.Provider>
  );
};

export const useKioskMode = () => {
  const context = useContext(KioskModeContext);
  if (!context) {
    throw new Error("useKioskMode must be used within a KioskModeProvider");
  }
  return context;
};

export default KioskModeContext;
