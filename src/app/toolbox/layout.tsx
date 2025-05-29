"use server";
import React from "react";
import Header from "./header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-24">
      <Header />
      {children}
    </div>
  );
};

export default layout;
