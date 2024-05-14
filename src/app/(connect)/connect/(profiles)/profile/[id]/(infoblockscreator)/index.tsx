import React from 'react';
import {MdInterests} from "react-icons/md";
import {IoBuildOutline} from "react-icons/io5";
import InterestsBlock from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/InterestsBlock";

const Index = [
    {
        name: "Interests",
        icon: <MdInterests />,
        comp: (data: any) => (
            <InterestsBlock />
        )
    },
    {
        name: "Personal Project",
        icon: <IoBuildOutline />,
        comp: (data: any) => (
            <h1>Project</h1>
        )
    }
];

export default Index;