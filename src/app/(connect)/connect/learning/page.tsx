"use client";
import React from "react";
import FeaturedLessons from "./(components)/FeaturedLessons";

const Learning = () => {
  return (
    <main className="flex flex-col h-full pb-20 gap-10">
      <header>
        <h1 className=" font-bold text-5xl ">Learning Lab</h1>
      </header>
      <section className="flex flex-col gap-3 h-1/2">
        <FeaturedLessons />
      </section>
      <section className="flex flex-row gap-3">
        <ul className="p-4 w-1/6 h-16 flex shadow-md flex-col justify-center bg-white rounded-xl">
          <h2 className="font-mono">Poll</h2>
          <h1>Hello</h1>
        </ul>
      </section>
      <footer></footer>
    </main>
  );
};

export default Learning;
