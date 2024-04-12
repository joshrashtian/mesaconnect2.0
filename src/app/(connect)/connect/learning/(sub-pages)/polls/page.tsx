"use client";
import React from "react";
import { usePollModal } from "../../LearningContext";
import FeaturedPolls from "../../_components/FeaturedPolls";
import ClassPollList from "../../_components/ClassSpecific";

const PollsHome = () => {
  const modal = usePollModal();

  return (
    <main className="flex flex-col gap-12">
      <h1 className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-teal-500 font-bold font-eudoxus text-5xl ">
        Questions & Polls
      </h1>
      <section className="gap-10 flex flex-col">
        <FeaturedPolls />
        <ClassPollList title="For Calculus I" classlist={} />
      </section>
    </main>
  );
};

export default PollsHome;
