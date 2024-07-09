import Link from "next/link";
import React from "react";
import { IoPeople, IoSettings } from "react-icons/io5";

const YourProfile = () => {
  return (
    <section className="p-6 w-full rounded-2xl bg-zinc-500/10">
      <h1 className=" font-eudoxus text-2xl flex flex-row items-center gap-2 font-bold">
        {" "}
        <IoSettings /> Profile Control Center
      </h1>
      <ul className="flex flex-col gap-4">
        <Link
          href={"/connect/profile/following"}
          className={` w-96 active:scale-90 hover:drop-shadow-xl rounded-lg hover:w-[400px] h-12 gap-4 text-white flex flex-row justify-center items-center group hover:scale-105 duration-500 font-eudoxus bg-zinc-800/10`}
        >
          <div className=" scale-0 text-2xl -rotate-90 drop-shadow-xl group-hover:-rotate-6 group-hover:scale-105 duration-500">
            <IoPeople />
          </div>
          <h1 className=" -translate-x-5 font-bold group-hover:translate-x-0 drop-shadow-xl duration-300 ">
            View Following
          </h1>
        </Link>
      </ul>
    </section>
  );
};

export default YourProfile;
