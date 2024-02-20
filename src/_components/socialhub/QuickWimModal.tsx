"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";

const QuickWimModal = ({ disengageModal }: { disengageModal: any }) => {
  const [text, setText] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>()
  const userdata = useContext(userContext)

  const onSubmit = async  () => {
    if(!text) {
        setErrorMessage("You cannot send a blank message!")
        return;
    } 
    if(text && text?.length < 4) {
        setErrorMessage("Please enter at least 4 characters");
        return;
    }

    const currentUserId = (await supabase.auth.getUser()).data.user?.id

    if(!currentUserId) {
        setErrorMessage("Error around getting User Details. Please try again.")
        return;
    }

    const { error } = await supabase.from('posts').insert({
      userid: currentUserId,
      data: {
        data: {
            type: 'wim',
            text: text
        }
      },
      creator: {
        id: currentUserId,
        name: userdata?.userData?.real_name,
      },
      type: 'wim',
    })

    if(error) {
        setErrorMessage("Error posting message to database. Please try again.")
        return;
    }

    console.log('Successfully Posted!')
    disengageModal()
    };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        exit={{opacity: 0}}
        className="fixed top-0 left-0 min-w-full min-h-full bg-black opacity-10"
      />
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ y: 20, opacity: 0 }}
        className="absolute gap-3 w-full left-0 top-1/4 flex flex-col items-center justify-center"
      >
        <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-orange-900 to-teal-700 ">
          What is on your mind?
        </h1>
        <ul className="bg-white w-4/5 shadow-xl rounded-3xl px-5 h-16 flex flex-row justify-between items-center">
          <input maxLength={50} type="text" onChange={(e) => {setText(e.target.value)}} className="w-3/4 h-full p-5 text-3xl text-slate-600 focus:outline-none" />
          <ul onClick={() => {onSubmit()}} className="p-3 px-6 hover:scale-105 cursor-pointer group hover:bg-teal-500 rounded-xl duration-300">
            <h1 className="text-black group-hover:text-white font-mono duration-300">
              Submit
            </h1>
          </ul>
        </ul>
        { errorMessage &&
            <h1 className="text-red-600 font-bold">{errorMessage}</h1>
        }
      </motion.section>
      <div onClick={() => {disengageModal()}} className="absolute w-16 h-16 cursor-pointer hover:scale-105 duration-300 bg-white rounded-full flex justify-center items-center top-10 right-10">
        <h1 className="text-4xl font-mono font-bold">X</h1>
      </div>
    </>
  );
};

export default QuickWimModal;
