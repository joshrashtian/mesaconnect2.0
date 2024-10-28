import DocsHeader from "@/_components/docs/docheader";
import React from "react";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-20">
      <DocsHeader />
      <article className="flex flex-row justify-end text-right">
        {children}
      </article>
    </div>
  );
};

export default DocsLayout;
