import DocsHeader from "@/_components/docs/docheader";
import React from "react";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-20">
      <DocsHeader />
      {children}
    </div>
  );
};

export default DocsLayout;
