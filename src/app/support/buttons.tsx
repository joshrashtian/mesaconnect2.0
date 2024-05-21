"use client"
import React, {useMemo} from 'react';
import {IoGitBranch, IoTicket} from "react-icons/io5";
import {useModal} from "@/app/(connect)/connect/Modal";
import NewTicket from "@/app/support/NewTicket";


const Buttons = () => {

  const modal = useModal()

  const categories = useMemo(() => [
    {
      title: 'Ticket',
      icon: <IoTicket />,
      color: 'bg-gradient-to-tr from-orange-500 to-red-500',
      comp: <NewTicket />
    },
    {
      title: 'Suggestions',
      icon: <IoGitBranch />,
      color: 'bg-gradient-to-tr from-blue-500 to-pink-500',
      comp: <NewTicket />
    },
  ], [])

  return (
      <ul className="flex gap-2">
        {categories.map((e) => (
          <button
            key={e.title}
            onClick={() => { modal.CreateModal(e.comp) }}
            className={`${e.color} rounded-2xl hover:opacity-80 active:scale-95 shadow-lg
             duration-300 hover:scale-105 p-3 w-64 text-white font-eudoxus text-xl h-24 flex flex-col-reverse origin-center `}
          >
            <p className="">{e.title}</p>
            <p className="text-7xl opacity-30 translate-y-7">
              {e.icon}
            </p>
          </button>
        ))}
      </ul>
  );
};

export default Buttons;
