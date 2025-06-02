"use server";
import React from "react";
import Header from "./header";
import Head from "next/head";
import Script from "next/script";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-24">
      <Header />

      {/* 
          1) Load the PDF.js core library before React hydration.
             We use “strategy=beforeInteractive” so that window.pdfjsLib
             is defined by the time any component’s useEffect runs.
        */}

      {children}
    </div>
  );
};

export default layout;
