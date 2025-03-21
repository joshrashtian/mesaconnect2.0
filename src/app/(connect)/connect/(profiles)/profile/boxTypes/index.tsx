import ProjectBox from "./ProjectBox";
import Skills from "./Skills";
import Interestsblock from "@/app/(connect)/connect/(profiles)/profile/boxTypes/interestsblock";
import InterestsBlock, {
  CreateInterest,
} from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/InterestsBlock";
import React from "react";
import { MdInterests } from "react-icons/md";
import { IoBuildOutline } from "react-icons/io5";
import { CreateTutorBlock, TutorBlock, TutorBlockSettings } from "./TutorBlock";
import { info } from "console";
import CommunityBlock, {
  CommunityEdit,
  CreateCommunityBlock,
} from "./CommunityBlock";
import ClassBox from "./ClassBlack";
import InProgClassBlock, {
  CreateInProg,
} from "../[id]/(infoblockscreator)/InProgClassesEdit";

export const Index = [
  {
    title: "About",
    component: (data: any) => {
      const e = data.data;
      return (
        <div>
          <p style={{ color: e.textColor }}>{e.contents}</p>
        </div>
      );
    },
    create: (data: any) => {},
  },
  {
    title: "Skills",
    component: (data: any) => {
      const e = data.data;
      return <Skills e={e} />;
    },
    create: (data: any) => {},
  },
  {
    title: "Links",
    component: (data: any) => {
      const e = data.data;
      return <ProjectBox e={e} />;
    },
    create: (data: any) => {},
  },
  {
    title: "Interests",
    component: (data: any) => {
      const e = data.data;
      return <Interestsblock data={e} />;
    },
    icon: <MdInterests />,
    create: <InterestsBlock />,
    add: <CreateInterest />,
    infoblock: true,
  },
  {
    title: "Tutors",
    icon: <MdInterests />,
    component: (data: any) => {
      const e = data.data;
      return <TutorBlock data={e} />;
    },
    create: () => <TutorBlockSettings />,
    add: <CreateTutorBlock />,
    infoblock: true,
  },
  {
    title: "Project",
    icon: <IoBuildOutline />,
    component: (data: any) => <h1>Project</h1>,
    create: () => {},
    add: () => {},
    infoblock: true,
  },
  {
    title: "Community",
    icon: <IoBuildOutline />,
    component: (data: any) => <CommunityBlock data={data.data} />,
    create: () => <CommunityEdit />,
    add: () => <CreateCommunityBlock />,
    infoblock: true,
  },
  {
    title: "In Progress Classes",
    icon: <IoBuildOutline />,
    component: (data: any) => <ClassBox data={data} />,
    create: () => <InProgClassBlock />,
    add: () => <CreateInProg />,
    infoblock: true,
  },
];
