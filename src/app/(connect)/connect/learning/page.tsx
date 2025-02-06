"use client";
import React from "react";
import FeaturedPolls from "./_components/FeaturedPolls";
import Link from "next/link";
import { IoIosBook } from "react-icons/io";
import { IoList, IoPerson } from "react-icons/io5";

const Learning = () => {
  const categories = [
    {
      color: "bg-gradient-to-br from-orange-500 to-red-800 hover:bg-indigo-300",
      title: "Your Learning Profile",
      link: "profile",
      icon: <IoIosBook size={26} />,
    },
    {
      color: "bg-gradient-to-tr from-orange-500 to-red-400 hover:bg-orange-300",
      title: "Creator Dashboard",
      link: "creator",
      icon: <IoPerson size={26} />,
    },
    {
      color:
        "bg-gradient-to-br from-indigo-500 to-teal-400 hover:bg-indigo-300",
      title: "Study Questions",
      link: "polls",
      icon: <IoList size={26} />,
    },
  ];
  return (
    <>
      <main className="flex h-full flex-col gap-10 pb-20">
        <header className="">
          <h1 className="inline-block bg-gradient-to-br from-blue-500 to-teal-500 bg-clip-text p-2 font-eudoxus text-5xl font-bold text-transparent">
            Learning Lab
          </h1>
        </header>
        <section className="flex gap-2 rounded-3xl bg-zinc-200/40 p-5">
          {categories.map((e) => (
            <Link
              key={e.title}
              href={`/connect/learning/${e.link}`}
              className={`${e.color} flex h-24 w-64 origin-center flex-col-reverse rounded-2xl p-3 font-eudoxus text-xl text-white shadow-lg duration-300 hover:scale-105 hover:opacity-80 active:scale-95`}
            >
              <p className="">{e.title}</p>
              {e.icon}
            </Link>
          ))}
        </section>
        <section className="w-full gap-16">
          {/*<FeaturedLessons />*/}
          <FeaturedPolls />
        </section>
        <footer></footer>
      </main>
    </>
  );
};

export default Learning;
