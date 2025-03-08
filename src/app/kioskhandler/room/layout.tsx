"use server";
import React, { Suspense } from "react";

const RoomLayout = async ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default RoomLayout;
