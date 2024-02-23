import Skills from "./Skills";

export const Index = [
  {
    title: "About",
    component: (data: any) => {
      const e = data.data;
      console.log("data", e);
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
];
