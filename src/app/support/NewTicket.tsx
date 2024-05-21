"use client"
import React, {useState} from 'react';
import Input from "@/_components/Input";
import {IoDocument, IoTicket} from "react-icons/io5";
import {useModal} from "@/app/(connect)/connect/Modal";
import {SubmitTicket} from "@/app/support/ServerFunctions";

const NewTicket = () => {
    const [title, setTitle] = useState<string>()
    const [details, setDetails] = useState<string>()
    const [type, setType] = useState<'ticket' | 'suggestion'>("ticket")

    const { DisarmModal } = useModal();

    return (
      <div className="flex flex-col gap-3 h-72">
          <h1 className="text-2xl">New Ticket</h1>
          <ul className="flex flex-row">
              <Input icon={<IoTicket/>} onChange={(e: any) => {
                  setTitle(e.target.value)
              }}/>
          </ul>
          <ul className="flex flex-row shadow-md bg-white gap-2 font-eudoxus items-center  hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6">
             <IoDocument/>
              <textarea
                  onChange={(e: any) => {
                      setDetails(e.target.value)
                  }}
                  className={`bg-transparent resize-none  p-4 focus:outline-none w-full h-full`}

              />
          </ul>
          <ul className="flex flex-row gap-2">
              {
                  ["ticket", "suggestion"].map((e: any) => (
                      <button onClick={() => setType(e)} className={`font-eudoxus p-3 px-5 rounded-xl ${ type === e ? 'bg-indigo-600 text-white' : 'bg-white'} duration-300`} key={e}>
                          <h1 className="capitalize">{e}</h1>
                      </button>
                  ))
              }
          </ul>
          <button onClick={async () => {
              if(!title || !details) return;
              let { error } = await SubmitTicket(title, details, type);
              if(error) return;
              else DisarmModal()}}
                  className={`font-eudoxus p-3 px-5 ${ (title && details) ? 'bg-indigo-600 text-white' : 'bg-white'} rounded-xl duration-300`}
                  >
              <h1>Submit</h1>
          </button>
      </div>
    );
};

export default NewTicket;
