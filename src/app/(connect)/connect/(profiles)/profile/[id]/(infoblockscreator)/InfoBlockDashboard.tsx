"use client"
import React, {useState} from 'react';
import {IoAdd, IoBuild} from "react-icons/io5";
import {InfoBlockType} from "@/app/(connect)/connect/(profiles)/profile/[id]/infoblocks";
import {Index} from "@/app/(connect)/connect/(profiles)/profile/boxTypes";

const InfoBlockDashboard = ({ Blocks } : { Blocks: InfoBlockType[] | undefined}) => {
  const [Active, setActive] = useState<any>()

  // @ts-ignore
  return (
    <React.Fragment>
      <main className="min-w-[110ch] max-w-[120ch] pb-10 h-[410px] font-eudoxus">
        <h1 className="text-4xl font-bold"><IoBuild/> Infoblocks</h1>
        <section className="w-full flex p-2 flex-row my-3 h-[90%]  bg-slate-200/20">
          <nav className="flex flex-col w-72 gap-0.5 p-2 overflow-y-scroll no-scrollbar">
            {Blocks?.map((d, i: number) => {
              console.log(d.type)
              const block = Index.find((e) => e?.title?.toLowerCase() === d.type.toLowerCase() )

              if(!block) return null

              return (
                <FormBlockButton key={d.id} onClick={() => {
                  setActive(block.create)
                }} className="w-48 capitalize bg-white">
                  {block.icon}
                  {d.type}
                </FormBlockButton>
              )

            })}

          </nav>
          {
            Active &&

            <section className="w-full">
              {Active}
            </section>
          }

        </section>
        <ul className="w-full flex flex-row-reverse">
        <button className="p-1 w-12 h-12 shadow-lg -translate-y-12 translate-x-4 rounded-full text-white relative flex justify-center items-center right-2 bg-teal-700">
          <IoAdd size={24}/>
        </button>
        </ul>
      </main>
    </React.Fragment>
    )
};

// eslint-disable-next-line react/display-name
export const FormBlockButton = React.memo((props: any) => (
    <button  {...props} className={`font-eudoxus rounded-lg duration-500 hover:scale-105 active:scale-95 delay-75 hover:drop-shadow-sm hover:ring-1 ring-offset-3 ring-white hover:ring-amber-600 active:ring-red-800 flex flex-row gap-2 items-center justify-center text-xl p-3 ${props.className}`}>
        {props.children}
    </button>
))

export default InfoBlockDashboard;
