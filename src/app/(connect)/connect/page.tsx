import React, { Suspense, lazy } from "react";
import TitleComponent from "./TitleComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hub",
  description: "Home for MESAConnect",
};

const page = () => {
  const Widgets = lazy(() => import("./homescreenwidgets"));

  return (
    <div className="flex h-full w-full flex-col gap-y-2 p-5">
      <TitleComponent />
      <Suspense fallback={<section className="h-full w-full bg-slate-900" />}>
        <Widgets />
      </Suspense>
    </div>
  );
};

export default page;
