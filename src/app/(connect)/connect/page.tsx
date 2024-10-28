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

      <section className="h-[95vh] min-h-fit">
        <TitleComponent />
        <Widgets />
      </section>
      <section className="flex min-h-[50vh] w-full flex-row items-center justify-center rounded-3xl bg-[#F78764]">
        <h3>News For You</h3>
      </section>
    </div>
  );
};

export default page;
