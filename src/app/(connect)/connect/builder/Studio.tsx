import { usePathname } from "next/navigation";
import React from "react";
import { BuilderIndex } from ".";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";

const Studio = ({ setSelect }: { setSelect: Function }) => {
  const pathname = usePathname();
  const options = [
    {
      name: "Post",
      routeTo: () => {
        setSelect(BuilderIndex[0]);
      },
      icon: (params: any) => <IoChatboxEllipsesOutline {...params} />,
    },
    {
      name: "Event",
      routeTo: () => {
        setSelect(BuilderIndex[1]);
      },
      icon: (params: any) => <FaListCheck {...params} />,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-[40%]">
      <h1 className="font-bold text-5xl font-eudoxus">MESA Studio</h1>
      <article className="flex flex-row gap-5 ">
        {options.map((option, index) => {
          return (
            <div key={index} className="w-full">
              <button
                onClick={option.routeTo}
                className="w-full h-64 flex group flex-col justify-center items-center border-zinc-200 border-2 hover:scale-[1.01] hover:border-zinc-400 duration-300 border-dotted text-white font-bold rounded-3xl"
              >
                <option.icon size={"20%"} color="#000" />
                <h1 className="text-black group-hover:scale-125 duration-300 text-2xl font-eudoxus">
                  {option.name}
                </h1>
              </button>
            </div>
          );
        })}
      </article>
      <div />
    </div>
  );
};

export default Studio;
