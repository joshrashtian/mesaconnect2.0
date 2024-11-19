"use server";
import React, { Suspense, lazy } from "react";
import TitleComponent from "./TitleComponent";
import { Metadata } from "next";
import BottomOnboarding from "./BottomOnboarding";
import { AnimatePresence } from "framer-motion";

const page = async () => {
  const Widgets = lazy(() => import("./homescreenwidgets"));

  return (
    <div className="my-4 flex min-h-full w-full flex-col gap-y-2 py-36 font-eudoxus">
      <BottomOnboarding />

      <section className="h-[95vh] min-h-fit">
        <TitleComponent />
        <Widgets />
      </section>
      <section className="flex h-[300px] w-full flex-col justify-center rounded-3xl bg-white p-8">
        <h3 className="text-2xl font-bold">Statistics</h3>

        <h3 className="text-2xl font-bold">Events in Clubs You Are In</h3>
      </section>
    </div>
  );
};

export default page;
