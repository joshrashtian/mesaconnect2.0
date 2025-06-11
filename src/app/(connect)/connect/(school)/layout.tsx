"use server";
import React from "react";
import SchoolHeader from "./schoolhead";

const SchoolLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-24 pt-24">
      <SchoolHeader />
      {children}
    </div>
  );
};

export default SchoolLayout;
