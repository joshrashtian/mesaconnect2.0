import BuildPost from "./(buildercomponents)/BuildPost";

export const BuilderIndex = [
  {
    postType: "Post",
    onSelect: () => {
      return (
        <BuildPost />
      );
    },
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
  },
];
