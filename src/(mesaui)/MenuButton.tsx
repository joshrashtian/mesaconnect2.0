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
      className={`${props.color} rounded-2xl hover:opacity-80 active:scale-95 shadow-lg
             duration-300 hover:scale-105 p-3 w-64 text-white font-eudoxus text-xl h-24 flex flex-col-reverse origin-center `}
    >
      <p className="">{props.title}</p>
      <p className="text-7xl opacity-30 translate-y-7">{props.icon}</p>
    </button>
  );
};

export default MenuButton;
