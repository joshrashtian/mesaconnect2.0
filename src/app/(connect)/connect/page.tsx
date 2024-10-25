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

      <section className="h-[95vh]">
        <TitleComponent />
        <Widgets />
      </section>
      <section className="h-[70vh] w-full rounded-3xl bg-[#F78764]"></section>
    </div>
  );
};

export default page;
