"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DeviceContextType {
  device: string;
  setDevice: (device: string) => void;
}

const DeviceContext = createContext<DeviceContextType>({
  device: "",
  setDevice: () => {},
});

const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [device, setDevice] = useState<string>("");

  useEffect(() => {
    const a = localStorage.getItem("user");
    setDevice(a || "");
  }, []);

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export function useDeviceContext() {
  return useContext(DeviceContext);
}

export default DeviceContextProvider;
