"use client";

import React from "react";

type MenuButtonProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

const MenuButton = (props: MenuButtonProps) => {
  return (
    <button
      key={props.title}
      onClick={props.onClick}
      className={`${props.color} flex h-24 w-64 origin-center flex-col-reverse rounded-2xl p-3 font-eudoxus text-xl text-white shadow-lg duration-300 hover:scale-105 hover:opacity-80 active:scale-95`}
    >
      <p className="">{props.title}</p>
      <p className="translate-y-4 text-7xl opacity-30">{props.icon}</p>
    </button>
  );
};

export default MenuButton;
