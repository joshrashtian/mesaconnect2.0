"use server";
import React, { Suspense, lazy } from "react";
import TitleComponent from "./TitleComponent";
import { Metadata } from "next";
import BottomOnboarding from "./BottomOnboarding";
import { AnimatePresence } from "framer-motion";

const page = async () => {
  const Widgets = lazy(() => import("./homescreenwidgets"));

  return (
    <div className="my-4 flex h-full w-full flex-col gap-y-2 py-36 font-eudoxus">
      <BottomOnboarding />

      <ul className="min-h-[95vh]">
        <TitleComponent />
        <Suspense fallback={<section className="h-full w-full bg-slate-900" />}>
          <Widgets />
        </Suspense>
      </ul>
    </div>
  );
};

export default page;
