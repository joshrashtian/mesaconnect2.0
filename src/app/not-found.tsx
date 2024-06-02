import Text404 from "@/_components/404text";
import ReturnButton from "@/_components/returnbutton";
import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <main className="min-h-screen gap-10 flex justify-center items-center">
      <div className="font-bold text-6xl font-eudoxus">
        <Text404 />
        <h1 className="">Error</h1>
      </div>
      <ul className="border-l-2 border-amber-600 font-eudoxus p-4">
        <h2 className="font-light text-2xl">This page does not exist.</h2>
        <ReturnButton />
      </ul>
    </main>
  );
};

export default Custom404;
