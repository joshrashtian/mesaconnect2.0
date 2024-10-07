import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

type StandardButtonProps = {
  icon?: React.ReactNode;
  text?: string;
  href?: Url;
  buttonType: "button" | "link";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StandardButton = (props: StandardButtonProps) => {
  switch (props.buttonType) {
    case "link":
      return (
        <Link
          //@ts-ignore
          href={props.href}
          passHref={true}
          className={`flex w-1/3 flex-row items-center justify-center gap-3 rounded-2xl bg-zinc-100 p-3 duration-300 hover:scale-105 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-800 ${props.className}`}
        >
          {props.icon && (
            <p className="text-lg dark:text-slate-200">{props.icon}</p>
          )}
          <p className="text-lg dark:text-slate-200">{props.children}</p>
        </Link>
      );
    case "button":
      return (
        <button
          onClick={props.onClick}
          className={`flex w-1/3 flex-row items-center justify-center gap-3 rounded-2xl bg-zinc-100 p-3 duration-300 hover:scale-105 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-800 ${props.className}`}
        >
          {props.icon && (
            <p className="text-lg dark:text-slate-200">{props.icon}</p>
          )}
          <p className="text-lg dark:text-slate-200">{props.children}</p>
        </button>
      );
  }
};

export default StandardButton;
