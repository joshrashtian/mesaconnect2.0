"use server";
import DocsHeader from "@/_components/docs/docheader";
import React, { Suspense } from "react";
import Navigate from "./_components/navigate";
import { DocsSidebar } from "./_components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DocsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 dark:text-slate-300">
      <SidebarProvider>
        <DocsSidebar />

        <article className="flex flex-row justify-end text-right">
          <SidebarTrigger />
          {children}
        </article>
        <Suspense>
          <Navigate />
        </Suspense>
      </SidebarProvider>
    </div>
  );
};

export default DocsLayout;
