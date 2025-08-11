"use server";
import React from "react";
import HomePageHeader from "../news/(homepage)/header";

const PathwayLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 p-14 font-eudoxus">{children}</div>
  );
};

export default PathwayLayout;
