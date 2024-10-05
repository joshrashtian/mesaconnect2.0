"use client"
import React, {useEffect, useState} from 'react';
import {icons, Interest} from "@/app/(connect)/connect/(tabs)/social/community/InterestButtons";
import {supabase} from "../../../../../../../config/mesa-config";

const Interestsblock = ({ data } : { data: any }) => {
    const [interests, setInterests] = useState<Interest[]>()
    useEffect(() => {
        async function getInterests() {
            const { data: NewData, error } = await supabase.from('interests').select().eq("userid", data?.userid)
            if(error) {
                console.error(error)
                return
            }

            else setInterests(NewData?.splice(0, data.data.length))
        }
        getInterests()
    }, []);

    return (
    <section className="flex-wrap flex gap-2 p ">
        {
            interests?.map((interest, index) => (
                <ul key={index} className="flex gap-2 items-center w-[49%] p-2 px-4 rounded-full bg-zinc-50">
                    {icons.find((e) => interest.fieldtype === e.name)?.icon}
                  <h1>{interest.interest}</h1>
                </ul>
            ))
        }
    </section>
)};

export default Interestsblock;