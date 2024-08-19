import React from "react";
import LearningContextProvider from "./LearningContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Lab",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-zinc-100 dark:bg-transparent max-h-screen  min-w-full ">
      <LearningContextProvider>{children}</LearningContextProvider>
    </section>
  );
};

export default layout;
