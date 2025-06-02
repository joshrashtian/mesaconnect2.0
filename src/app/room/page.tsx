import Header from "@/_components/home/header";
import React from "react";

const RoomFrontPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 font-eudoxus">
      <Header />
      <h1 className="text-4xl font-bold text-white">
        Use the MESA Connect Platform to enhance the Study Room Exprience.
      </h1>
      <p className="text-white">
        Use the kiosks at select study rooms to access the MESA Connect Platform
        to enhance, speed up, and level up your study exprience.
      </p>
    </div>
  );
};

export default RoomFrontPage;
