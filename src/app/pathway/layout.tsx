"use server";
import React, { Suspense } from "react";
import HomePageHeader from "../news/(homepage)/header";
import PathwayContextProvider from "./PathwayContext";

const PathwayLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 p-14 font-eudoxus">
      <Suspense fallback={<div>Loading...</div>}>
        <PathwayContextProvider>{children}</PathwayContextProvider>
      </Suspense>
    </div>
  );
};

export default PathwayLayout;
