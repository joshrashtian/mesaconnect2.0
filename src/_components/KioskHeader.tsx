"use client";

import React from "react";
import { useKioskMode } from "@/_contexts/KioskModeContext";
import { Button } from "@/components/ui/button";
import { Power, Music, Video, Monitor } from "lucide-react";
import {
  shouldShowExitButton,
  shouldShowExternalApps,
} from "@/lib/kiosk-config";
import { BsSpotify } from "react-icons/bs";
import { BiLogoZoom } from "react-icons/bi";
import { IoApps, IoSettings } from "react-icons/io5";
import { useTabSwitcher } from "@/lib/tab-switcher";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KioskHeaderProps {
  className?: string;
  showExitButton?: boolean;
  showExternalApps?: boolean;
}

const KioskHeader: React.FC<KioskHeaderProps> = ({
  className = "",
  showExitButton = true,
  showExternalApps = true,
}) => {
  const { isKioskMode, kioskType, deactivateKioskMode, openExternalApp } =
    useKioskMode();
  const {
    tabs,
    activeTab,
    switchToTab,
    switchToSpotify,
    switchToZoom,
    switchToMesa,
  } = useTabSwitcher();

  const [currentTime, setCurrentTime] = React.useState(new Date());

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    // Add padding to body when kiosk mode is active
    if (isKioskMode) {
      document.body.style.paddingTop = "64px"; // 16 * 4 = 64px for h-16
      document.body.style.paddingBottom = "48px"; // 12 * 4 = 48px for h-12
    } else {
      document.body.style.paddingTop = "";
      document.body.style.paddingBottom = "";
    }

    return () => {
      // Cleanup when component unmounts
      document.body.style.paddingTop = "";
      document.body.style.paddingBottom = "";
    };
  }, [isKioskMode]);

  if (!isKioskMode) {
    return null;
  }

  const getKioskTypeColor = () => {
    switch (kioskType) {
      case "spotify":
        return "bg-green-600";
      case "zoom":
        return "bg-blue-600";
      case "custom":
        return "bg-purple-600";
      default:
        return "bg-orange-600";
    }
  };

  const getKioskTypeIcon = () => {
    switch (kioskType) {
      case "spotify":
        return <BsSpotify className="h-5 w-5" />;
      case "zoom":
        return <BiLogoZoom className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[9999] flex h-16 items-center justify-between bg-gradient-to-r from-gray-500 to-gray-600 px-6 font-eudoxus text-white shadow-lg ${className}`}
    >
      <div className="flex items-center gap-3">
        {getKioskTypeIcon()}
        <h1 className="text-xl font-bold">MESA Kiosk</h1>
      </div>

      <div className="flex items-center gap-5">
        <span className="text-lg">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoApps className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 mt-10 grid grid-cols-3 gap-2 p-2">
            <button
              className={`flex h-16 w-16 items-center justify-center rounded-lg p-0.5 text-3xl text-white transition-all ${
                activeTab?.id === "mesa"
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 ring-2 ring-white"
                  : "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-orange-500 hover:to-orange-600"
              }`}
              onClick={() => switchToMesa()}
              title="Switch to MESA Connect"
            >
              🏠
            </button>
            <button
              className={`flex h-16 w-16 items-center justify-center rounded-lg p-0.5 text-3xl text-white transition-all ${
                activeTab?.id === "spotify"
                  ? "bg-gradient-to-br from-green-500 to-green-600 ring-2 ring-white"
                  : "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-green-500 hover:to-green-600"
              }`}
              onClick={() => switchToSpotify()}
              title="Switch to Spotify"
            >
              🎵
            </button>
            <button
              className={`flex h-16 w-16 items-center justify-center rounded-lg p-0.5 text-3xl text-white transition-all ${
                activeTab?.id === "zoom"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 ring-2 ring-white"
                  : "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-blue-500 hover:to-blue-600"
              }`}
              onClick={() => switchToZoom()}
              title="Switch to Zoom"
            >
              📹
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoSettings className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="w-full px-2"
              onClick={deactivateKioskMode}
            >
              <Power className="mr-1 h-4 w-4" />
              Exit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default KioskHeader;
