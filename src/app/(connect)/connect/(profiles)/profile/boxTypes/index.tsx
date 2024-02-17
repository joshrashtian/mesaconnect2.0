import Skills from "./Skills";

export const Index = [
  {
    title: "About",
    component: (data: any) => {
      const e = data.data
      return (
        <div>
          <h1 className="font-bold">About Me</h1>
          <p>{e.contents}</p>
        </div>
      );
    },
    create: (data: any) => {
    }
  },
  {
    title: "Skills",
    component: (data: any) => {
      const e = data.data
      return (
        <Skills e={e} />
      );
    },
    create: (data: any) => {
    }
  }
];
