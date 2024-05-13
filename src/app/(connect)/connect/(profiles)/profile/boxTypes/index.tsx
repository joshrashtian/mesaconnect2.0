import ProjectBox from "./ProjectBox";
import Skills from "./Skills";
import Interestsblock from "@/app/(connect)/connect/(profiles)/profile/boxTypes/interestsblock";

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
    create: (data: any) => {},
  },
];
