"use server"
import React from "react";

export async function generateMetadata() {
  return {
    title: "News"
  }
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" dark:from-slate-800 dark:to-orange-950 bg-gradient-to-b from-zinc-100 from-[40%] to-orange-100 dark:bg-gradient-to-b p-16 h-screen duration-700">
      {children}
    </main>
  );
};

export default layout;
