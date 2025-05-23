import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowForward } from "react-icons/io5";

const MobilePreview = () => {
  return (
    <section className="flex w-full flex-col items-start justify-between gap-2 bg-gradient-to-tr from-zinc-100 to-zinc-200 p-5 py-20 font-eudoxus text-sm text-slate-400 lg:p-10">
      <h1 className="h-16 border-collapse bg-gradient-to-r from-blue-500 via-slate-500 to-teal-500 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md lg:text-5xl">
        Experience the new dimension on the go.
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-100/80 lg:text-lg">
        Access your college&apos;s courses, get information, see other
        students&apos; opinions and questions, and use the MESA Toolbox to
        upgrade your community college experience.
      </p>
      <section className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="mt-10 h-fit w-[500px] rounded-full bg-teal-500/20 px-24 py-10 drop-shadow-xl duration-1000 hover:rotate-[15deg] hover:scale-105 hover:cursor-crosshair hover:ring-4 hover:ring-teal-500/50 active:rotate-[375deg] lg:w-[600px]">
          <Image
            src={require("../../../src/_assets/photos/PhoneExample.png")}
            alt="mobilepreview"
          />
        </div>
        <p className="w-full text-wrap text-center text-sm text-slate-500 dark:text-slate-100/80 lg:w-1/2 lg:text-right lg:text-2xl">
          Message your friends, plan out your schedule, post your thoughts, view
          your progress and view University Information at a glance.
        </p>
      </section>
      <Link href="/mobile" className="mt-10 w-fit">
        <h5 className="w-fit border-b-2 border-slate-100 text-sm text-slate-500 duration-1000 hover:border-slate-500 dark:text-slate-100/80 lg:text-3xl">
          View More Information <IoArrowForward className="inline" />
        </h5>
      </Link>
    </section>
  );
};

export default MobilePreview;
