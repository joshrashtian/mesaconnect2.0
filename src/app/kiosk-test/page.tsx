"use client";

import React from "react";
import { useKioskMode } from "@/_contexts/KioskModeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Video, Monitor, Settings } from "lucide-react";

const KioskTestPage = () => {
  const {
    isKioskMode,
    kioskType,
    activateKioskMode,
    deactivateKioskMode,
    openExternalApp,
  } = useKioskMode();

  const kioskTypes = [
    {
      id: "default" as const,
      name: "Default Kiosk",
      icon: Monitor,
      description: "Standard kiosk mode",
      color: "bg-orange-500",
    },
    {
      id: "spotify" as const,
      name: "Spotify Kiosk",
      icon: Music,
      description: "Music-focused kiosk",
      color: "bg-green-500",
    },
    {
      id: "zoom" as const,
      name: "Zoom Kiosk",
      icon: Video,
      description: "Video conferencing kiosk",
      color: "bg-blue-500",
    },
    {
      id: "custom" as const,
      name: "Custom Kiosk",
      icon: Settings,
      description: "Customizable kiosk",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Kiosk Mode Test Page</h1>
        <p className="text-xl text-muted-foreground">
          Test the global kiosk mode functionality
        </p>

        {isKioskMode && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-green-800">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="font-medium">
              Kiosk Mode Active -{" "}
              {kioskType.charAt(0).toUpperCase() + kioskType.slice(1)}
            </span>
          </div>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kioskTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card key={type.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  {type.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {type.description}
                </p>
                <Button
                  onClick={() => activateKioskMode(type.id)}
                  className={`w-full ${type.color} hover:opacity-90`}
                  disabled={isKioskMode && kioskType === type.id}
                >
                  {isKioskMode && kioskType === type.id ? "Active" : "Activate"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isKioskMode && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>External Apps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => openExternalApp("spotify")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Music className="mr-2 h-4 w-4" />
                Open Spotify
              </Button>
              <Button
                onClick={() => openExternalApp("zoom")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Video className="mr-2 h-4 w-4" />
                Open Zoom
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kiosk Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={deactivateKioskMode}
                variant="destructive"
                className="w-full"
              >
                Exit Kiosk Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>URL-Based Activation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              You can also activate kiosk mode by adding parameters to the URL:
            </p>
            <div className="space-y-2 font-mono text-sm">
              <div className="rounded bg-gray-100 p-2">
                <span className="text-blue-600">Default:</span>{" "}
                ?kiosk=true&kioskType=default
              </div>
              <div className="rounded bg-gray-100 p-2">
                <span className="text-green-600">Spotify:</span>{" "}
                ?kiosk=true&kioskType=spotify
              </div>
              <div className="rounded bg-gray-100 p-2">
                <span className="text-cyan-600">Zoom:</span>{" "}
                ?kiosk=true&kioskType=zoom
              </div>
              <div className="rounded bg-gray-100 p-2">
                <span className="text-purple-600">Custom:</span>{" "}
                ?kiosk=true&kioskType=custom
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KioskTestPage;
