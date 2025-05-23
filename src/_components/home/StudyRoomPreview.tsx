import React from "react";

const StudyRoomPreview = () => {
  return (
    <section className="flex w-full flex-col items-start justify-between gap-2 bg-gradient-to-tr from-zinc-100 to-zinc-200 p-5 py-20 font-eudoxus text-sm text-slate-400 lg:p-10">
      <h1 className="h-fit border-collapse bg-gradient-to-r from-blue-500 via-slate-500 to-teal-500 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md lg:text-5xl">
        Interact with your classmates more interactively in the real world.
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-100/80 lg:text-lg">
        {/* TODO: Add a description of the study room */}
      </p>
    </section>
  );
};

export default StudyRoomPreview;
