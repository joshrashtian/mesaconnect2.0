"use client";
import LoadingObject from "@/(mesaui)/LoadingObject";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoadingObject />}>{children}</Suspense>;
};

export default Layout;
