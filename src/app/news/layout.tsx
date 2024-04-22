import React from "react";
import { ArticleModalProvider } from "./ArticleModal";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" dark:from-slate-800 dark:to-orange-950 bg-gradient-to-b from-zinc-100 from-[40%] to-orange-100 dark:bg-gradient-to-b p-16 h-screen duration-700">
      <Provider>{children}</Provider>
    </main>
  );
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ArticleModalProvider>{children}</ArticleModalProvider>;
};

export default layout;
