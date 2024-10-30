"use server";
import DocsHeader from "@/_components/docs/docheader";
import React, { Suspense } from "react";
import Navigate from "./_components/navigate";

const DocsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-20 dark:text-slate-300">
      <DocsHeader />
      <article className="flex flex-row justify-end text-right">
        {children}
      </article>
      <Suspense>
        <Navigate />
      </Suspense>
    </div>
  );
};

export default DocsLayout;
