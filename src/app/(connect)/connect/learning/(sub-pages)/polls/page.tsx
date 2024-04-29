import React from "react";
import FeaturedPolls from "../../_components/FeaturedPolls";
import ClassPollList from "../../_components/ClassSpecific";

const PollsHome = () => {
  return (
    <main className="flex flex-col absolute min-h-screen w-screen pt-32 left-0 top-0 gap-12">
      <header className="h-28 flex fixed items-center px-10 w-full bg-gradient-to-b from-zinc-200 to-transparent top-0 left-0">
        <h1 className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-teal-600 font-bold font-eudoxus text-5xl ">
          MESApolls
        </h1>
      </header>

      <section className="gap-10 flex flex-col p-10">
        <FeaturedPolls />
        <ClassPollList classid="c6eb331c-bf25-4600-a660-f6dab5219e2f" />
        <ClassPollList classid="707914dc-c067-4a59-b0cb-5a8261fca8bc" />
      </section>
    </main>
  );
};

export default PollsHome;
