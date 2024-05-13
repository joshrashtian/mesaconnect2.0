"use client"

import {Index} from "@/app/(connect)/connect/(profiles)/profile/boxTypes";
import {useEffect, useState} from "react";
import {supabase} from "../../../../../../../config/mesa-config";
import { motion } from "framer-motion";
import {IoAdd} from "react-icons/io5";

const Infoblocks = (props: any) => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        async function getBlocks() {
            const { data, error } = await supabase.from("infoblocks").select().eq("userid", props.user.id)
            if(error) {
                console.error(error.message)
                return
            }
            setBlocks(data.length != 0 ? data : null)
        }
        getBlocks()
    }, []);

    return (
        <section className="w-full">
            <ul className="flex justify-between items-center">
            <h2 className="font-bold text-3xl font-eudoxus ">
                Inside {props.user.real_name}
            </h2>
            <button className="relative right-0">
                <IoAdd/>
            </button>
            </ul>
            <ul className="flex flex-row w-full h-full font-eudoxus flex-wrap gap-2">

                {blocks ? blocks.map((e: any, index: number) => {
                    return (
                        <motion.section
                            transition={{delay: 2, duration: 1}}
                            initial={{rotateX: "90deg"}}
                            animate={{rotateX: "0deg"}}
                            key={index}
                            className="w-[49%] origin-bottom min-h-full shadow-lg p-5 rounded-xl bg-white"
                        >
                            {Index.map((d: any, i: number) => {

                                if (d.title.toLowerCase() === e.type.toLowerCase()) {
                                    return (
                                        <div key={i}>
                                            <h1 className="font-bold">{d.title}</h1>
                                            <d.component data={e}/>
                                        </div>
                                    );
                                }
                            })}
                        </motion.section>
                    );
                }) : <h1>No InfoBlocks.</h1>}

            </ul>
        </section>
    )
}

export default Infoblocks;