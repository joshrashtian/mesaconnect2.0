"use server";
import React, { Suspense, lazy } from "react";
import TitleComponent from "./TitleComponent";
import { Metadata } from "next";
import BottomOnboarding from "./BottomOnboarding";
import { AnimatePresence } from "framer-motion";
import ProfileStats from "@/_components/home/ProfileStats";
import { ComingUpEvent } from "@/_components/home/ComingUpEvent";

const page = async () => {
  const Widgets = lazy(() => import("./homescreenwidgets"));

  return (
    <div className="my-4 flex min-h-full w-full flex-col gap-y-2 py-36 font-eudoxus">
      <BottomOnboarding />

      <section className="h-[95vh] min-h-fit">
        <TitleComponent />
        <Widgets />
      </section>
      <section className="flex h-[300px] w-full flex-col justify-center gap-5 rounded-3xl bg-white p-3">
        <ProfileStats />
      </section>
      <section className="flex h-[300px] w-full flex-col justify-center gap-5 rounded-3xl bg-white p-3 px-6">
        <h3 className="text-2xl font-bold">Coming Up</h3>
        <ComingUpEvent />
      </section>
    </div>
  );
};

export default page;
