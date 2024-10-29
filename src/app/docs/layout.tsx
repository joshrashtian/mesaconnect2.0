"use server";
import DocsHeader from "@/_components/docs/docheader";
import React from "react";
import Navigate from "./_components/navigate";

const DocsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-20">
      <DocsHeader />
      <article className="flex flex-row justify-end text-right">
        {children}
      </article>
      <Navigate />
    </div>
  );
};

export default DocsLayout;
