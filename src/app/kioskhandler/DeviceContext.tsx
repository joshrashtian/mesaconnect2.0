"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DeviceContextType {
  device: { name: string };
  setDevice: (device: { name: string }) => void;
}

const DeviceContext = createContext<DeviceContextType>({
  device: { name: "" },
  setDevice: () => {},
});

const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [device, setDevice] = useState<{ name: string }>({ name: "" });

  useEffect(() => {
    const a = localStorage.getItem("settings");
    if (a) {
      setDevice(JSON.parse(a));
    }
  }, []);

  const updateDevice = (device: { name: string }) => {
    setDevice(device);
    localStorage.setItem("settings", JSON.stringify(device));
  };
  return (
    <DeviceContext.Provider value={{ device, setDevice: updateDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export function useDeviceContext() {
  return useContext(DeviceContext);
}

export default DeviceContextProvider;
