"use client";

import React, {
  Component,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
} from "react";

const Input = (
  props: { icon?: ReactNode } & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <ul className="flex w-full flex-row items-center gap-2 rounded-2xl bg-white px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] dark:bg-zinc-600 dark:text-slate-200">
      {props.icon}
      <input
        {...props}
        className={`h-full w-full bg-transparent p-4 focus:outline-none ${props.className}`}
      />
    </ul>
  );
};

export default Input;
