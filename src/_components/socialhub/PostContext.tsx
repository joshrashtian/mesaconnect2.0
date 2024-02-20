'use client'

import React from "react";
import { useRouter } from "next/navigation";

const PostContext = ({
  rightClick,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}: {
  rightClick: any;
  positionX: number;
  positionY: number;
  isToggled: boolean;
  buttons: any;
  contextMenuRef: any;
}) => {

  const router = useRouter()
  if(!isToggled) return null

  return (
    <menu
      style={{ top: `${positionY + 2}px`, left: `${positionX + 2}px` }}
      className={`absolute bg-white w-32 rounded-xl shadow-md flex flex-col items-center`}
    >
      {
        buttons.map((e: any, index: number) => {
            if(!e.visible) return
            
            return (
              <li
                key={e.name}
                className="cursor-pointer w-full rounded-xl flex flex-row justify-center p-3 hover:bg-slate-100"
                onClick={() => {
                  e.function()
                }}
              >
                <h1 className="text-md">{e.name}</h1>
              </li>
            )
        })
      }
    </menu>
  );
};

export default PostContext;
