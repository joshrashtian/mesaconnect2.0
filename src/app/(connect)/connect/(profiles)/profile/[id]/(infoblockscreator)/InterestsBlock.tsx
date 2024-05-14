"use client"
import React, {useCallback, useEffect} from 'react';
import Switch from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/Switch";
import {supabase} from "../../../../../../../../config/mesa-config";
import {useUser} from "@/app/AuthContext";
import {useToast} from "@/app/(connect)/InfoContext";

const InterestsBlock = () => {
    const [visible, setVisible] = React.useState(false);
    const [exists, setExists] = React.useState(false);
    const { user } = useUser()
    const { CreateErrorToast } = useToast();

    useEffect(() => {
        async function get() {
            const { data, error } = await supabase.from('infoblocks').select("id").match({userid: user?.id, type: 'interests' }).single()
            if(error) {
              setExists(false)
                return
            }
            if(!data) {
                setExists(false)
            }
            else setExists(true)
        }
        get()
    }, []);

    const changeVisibiity = useCallback(async () => {
        const { data, error } = await supabase.from('infoblocks').update({ visible: visible ? 'private' : 'public' }).eq('userid', user?.id).select()

        if(error) CreateErrorToast(error.message)
        else setVisible(!visible)
    }, [])

    if(!exists) return (null)
    return (
        <div>
            <h1>Interests</h1>
            <p>Visability For Public</p>
            <Switch click={changeVisibiity} toggled={visible} />
        </div>
    );
};

export default InterestsBlock;
