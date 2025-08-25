"use client";
import React from "react";
import KioskInput from "../(kioskui)/input";
import { useDeviceContext } from "../DeviceContext";
const KioskSettings = () => {
  const { device, setDevice } = useDeviceContext();
  return (
    <div className="flex flex-col gap-2 p-12 pt-20 text-white">
      <h1 className="text-2xl font-bold">Settings</h1>
      <KioskInput
        name="name"
        placeholder="Name"
        onChange={(e) => {
          setDevice({ name: e.target.value });
        }}
        value={device.name}
      />
    </div>
  );
};

export default KioskSettings;
