import BuildPost from "./(buildercomponents)/BuildPost";
import AboutSection from "./(profbuildercomponents)/AboutSection";

export const BuilderIndex = [
  {
    postType: "Post",
    onSelect: () => {
      return (
        <BuildPost />
      );
    },
    class: 0,
  },
  {
    postType: "Wim",
    onSelect: () => {
      return (
        <div>
          <h1>Wim</h1>
        </div>
      );
    },
    class: 0,
  },
  {
    postType: "Basic Information",
    onSelect: () => {
      return (
        <AboutSection />
      );
    },
    class: 1,
  }
];