"use client";
import React, { useContext } from "react";
import FeaturedLessons from "./_components/FeaturedLessons";
import PollCard from "./_components/PollCard";
import FeaturedPolls from "./_components/FeaturedPolls";
import { userContext } from "@/app/AuthContext";
import Link from "next/link";

const Learning = () => {
  const categories = [
    {
      color: "bg-gradient-to-tr from-orange-500 to-red-400 hover:bg-orange-300",
      title: "Community Questions",
      link: "",
    },
    {
      color:
        "bg-gradient-to-br from-indigo-500 to-teal-400 hover:bg-indigo-300",
      title: "Study Questions",
      link: "polls",
    },
  ];
  return (
    <>
      <main className="flex flex-col h-full pb-20 gap-10">
        <header className="">
          <h1 className="inline-block p-2 bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-teal-500 font-bold font-eudoxus text-5xl ">
            Learning Lab
          </h1>
        </header>
        <section className="flex gap-2 ">
          {categories.map((e) => (
            <Link
              href={`/connect/learning/${e.link}`}
              className={`${e.color} rounded-2xl hover:opacity-80 shadow-lg
             duration-300 hover:scale-105 p-3 w-64 h-24 flex justify-center items-center`}
            >
              <p className="text-white font-eudoxus text-xl">{e.title}</p>
            </Link>
          ))}
        </section>
        <section className=" w-full gap-16 ">
          {/*<FeaturedLessons />*/}
          <FeaturedPolls />
        </section>
        <footer></footer>
      </main>
    </>
  );
};

export default Learning;
