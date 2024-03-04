import BuildPost from "./(buildercomponents)/BuildPost";
import AboutSection from "./(profbuildercomponents)/AboutSection";
import EventBuilder from "./(profbuildercomponents)/EventBuilder";
import Projects from "./(profbuildercomponents)/Projects";
import SkillsSection from "./(profbuildercomponents)/SkillsSection";

export const BuilderIndex = [
  {
    postType: "Post",
    onSelect: () => {
      return <BuildPost />;
    },
    class: 0,
  },
  {
    postType: "Events",
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Event Builder</h1>
          <EventBuilder />
        </main>
      );
    },
    class: 0,
  },
  {
    postType: "Basic Information",
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Basic Information</h1>
          <AboutSection />
          <SkillsSection />
        </main>
      );
    },
    class: 1,
  },
  {
    postType: "Projects",
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Links</h1>
          <Projects />
        </main>
      );
    },
    class: 1,
  },
];
