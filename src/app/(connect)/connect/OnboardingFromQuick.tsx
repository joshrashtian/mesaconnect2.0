"use client"
import React, {useCallback, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {useUser} from "@/app/AuthContext";
import {UpdateUser} from "@/_functions/edituser";
import {useToast} from "@/app/(connect)/InfoContext";

const OnboardingFromQuick = () => {
    const {user, userData: data} = useUser();
    const [changes, setChanges] = useState<any>();
    const toast = useToast()

    const uploadChanges = async () => {
        const { data, error } = await UpdateUser(changes)

        if(error) toast.CreateErrorToast(error.message)
    }

    return (
        <AnimatePresence>
            <motion.section
                initial={{opacity: 0, backgroundColor: "#000"}}
                animate={{opacity: 1, backgroundColor: "rgb(234 88 12)"}}
                exit={{opacity: 0, backgroundColor: "#fff", scale: 0.9}}
                key="our_second_page_please_track_and_thank_you_sir"
                transition={{duration: 0.5, delay: 1}}
                className="min-h-screen flex-col flex justify-center font-eudoxus items-center min-w-screen"
            >
                <motion.h1 initial={{ opacity: 0, y: 20}} transition={{ delay: 1}} animate={{ opacity: 1, y:0 }} className="font-eudoxus text-white text-3xl">Hold on one more moment!</motion.h1>
                <motion.h2 initial={{ opacity: 0, y: 20}} transition={{ delay: 1.9, duration: 0.5}} animate={{ opacity: 1, y:0 }} className="font-eudoxus text-white text-2xl">We just need a few more things set up before we let you go.</motion.h2>
                <motion.ul className="w-96 flex flex-col gap-3" initial={{ opacity: 0, y: 20}} transition={{ delay: 3}} animate={{ opacity: 1, y:0 }}>
                    {
                        !data?.username && (
                        <React.Fragment>
                            <p className="text-slate-100 text-2xl">Create Your Username</p>
                        <input
                            className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"

                            placeholder="@handle"
                            onChange={(e) => {
                                setChanges({ ...changes,
                                    username: e.target.value});
                            }}
                        />
                        </React.Fragment>
                        )
                    }

                    <button
                        onClick={uploadChanges}
                        className=" p-3 w-full duration-500 hover:scale-105 hover:bg-teal-700 text-white font-eudoxus bg-theme-blue rounded-2xl"
                    >
                        Confirm
                    </button>
                </motion.ul>
            </motion.section>
        </AnimatePresence>
    );
};

export default OnboardingFromQuick;