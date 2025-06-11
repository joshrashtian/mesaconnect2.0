"use client";
import React, { useEffect, useState } from "react";
import FeaturedPolls from "./_components/FeaturedPolls";
import Link from "next/link";
import { IoIosBook } from "react-icons/io";
import { IoList, IoPerson } from "react-icons/io5";
import { supabase } from "../../../../../config/mesa-config";
import CollegeTop from "./_components/CollegeTop";

const Learning = () => {
  const [classes, setClasses] = useState([]);
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

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .schema("information")
        //@ts-ignore
        .from("classes")
        .select("*")
        .order("popularity", { ascending: false })
        .limit(5);
      if (error) {
        console.error(error);
      } else {
        //@ts-ignore
        setClasses(data);
      }
    };
    fetchClasses();
  }, []);

  return (
    <>
      <main className="flex h-full flex-col gap-10 pb-20">
        <header className="">
          <h1 className="inline-block bg-gradient-to-br from-blue-500 to-teal-500 bg-clip-text p-2 font-eudoxus text-5xl font-bold text-transparent">
            Learning Lab
          </h1>
        </header>
        <CollegeTop />
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
        <section className="w-full gap-16 rounded-3xl bg-zinc-200/40 p-5">
          <h2 className="text-2xl font-bold">Popular Classes</h2>
          <div className="flex flex-row gap-4 overflow-y-visible overflow-x-scroll p-3">
            {classes.map((e: any) => (
              <Link
                href={`/connect/class/${e.id}`}
                className="flex h-24 w-[900px] flex-col gap-2 rounded-2xl bg-white p-3 shadow-lg duration-300 hover:scale-105 hover:opacity-80 active:scale-95"
                key={e.id}
              >
                <h3 className="text-xl font-bold">{e.name}</h3>
              </Link>
            ))}
          </div>
        </section>
        <footer></footer>
      </main>
    </>
  );
};

export default Learning;
