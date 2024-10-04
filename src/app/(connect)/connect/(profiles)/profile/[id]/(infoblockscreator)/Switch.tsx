"use client";
import React from "react";

const Switch = ({
  click,
  toggled,
  setVisible,
}: {
  click?: () => void;
  setVisible?: any;
  toggled: boolean;
}) => {
  return (
    <div className="flex h-8 w-16 justify-center rounded-full bg-slate-200 dark:bg-slate-600">
      <circle
        onClick={() => {
          if (click) click();
          else if (setVisible) setVisible((prev: boolean) => !prev);
        }}
        className={`${toggled ? "translate-x-4 bg-green-500/40 dark:bg-green-500" : "-translate-x-4 bg-red-800/40 dark:bg-red-600"} h-8 w-8 cursor-pointer rounded-full duration-500 ease-in-out hover:scale-110`}
      />
    </div>
  );
};

export default Switch;
