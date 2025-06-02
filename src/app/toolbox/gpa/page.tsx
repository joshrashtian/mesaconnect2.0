"use client";
import GPAChart from "./GPAChart";
import GPAList from "./GPAList";
import dynamic from "next/dynamic";
import Saves from "./saves";
import Statistics from "./Statistics";
import ImportTranscript from "./ImportTranscript";
const GPACalculator = () => {
  const AddClass = dynamic(() => import("./AddClass"), { ssr: false });

  return (
    <div className="flex flex-col p-7 font-eudoxus">
      <h1 className="mb-5 text-2xl font-bold">GPACalculator</h1>
      <GPAChart />

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
        <AddClass />
        <GPAList />
        <Saves />
        <Statistics />
        <ImportTranscript />
      </div>
    </div>
  );
};

export default GPACalculator;
