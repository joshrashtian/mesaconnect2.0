"use client"
import React, {ReactNode, useState} from 'react';
import {MdInterests} from "react-icons/md";
import {IoBuild} from "react-icons/io5";
import Index from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/index";

const InfoBlockDashboard = () => {
    const [Active, setActive] = useState<JSX.Element>()

    return (
    <React.Fragment>
        <main className="min-w-[110ch] max-w-[120ch] pb-10 h-[400px] font-eudoxus">
            <h1 className="text-4xl font-bold"><IoBuild /> Infoblocks</h1>
            <section className="w-full flex p-2 flex-row my-3 h-[90%]  bg-slate-200/20">
                <nav className="flex flex-col w-72 gap-0.5 p-2 overflow-y-scroll no-scrollbar">
                    {Index.map((d, i: number) => {
                        return (
                            <FormBlockButton key={d.name} onClick={() => {
                                setActive(<d.comp />)
                            }} className="w-48 bg-white">
                                {d.icon}
                                {d.name}
                            </FormBlockButton>
                        )

                    })}

                </nav>
                {Active &&
                    <section className="w-full">
                        {Active}
                    </section>
                }
            </section>
        </main>
    </React.Fragment>
)};

// eslint-disable-next-line react/display-name
export const FormBlockButton = React.memo((props: any) => (
    <button  {...props} className={`font-eudoxus rounded-lg duration-500 hover:scale-105 active:scale-95 delay-75 hover:drop-shadow-sm hover:ring-1 ring-offset-3 ring-white hover:ring-amber-600 active:ring-red-800 flex flex-row gap-2 items-center justify-center text-xl p-3 ${props.className}`}>
        {props.children}
    </button>
))

export default InfoBlockDashboard;