import { gradientTextDefault } from "@/colors";
import React from "react";

type TitleComponentProps = {
  size?: "small" | "medium" | "large";
} & React.HTMLAttributes<HTMLHeadingElement>;

const TitleComponent = (Props: TitleComponentProps) => {
  const size =
    Props.size === "small"
      ? "text-3xl"
      : Props.size === "medium"
      ? "text-5xl"
      : "text-7xl";

  return (
    <h1
      className={`font-eudoxus font-black flex-row ${size} text-orange-700 dark:text-purple-700 items-center gap-3 
        flex  ${Props.className}`}
      {...Props}
    >
      {Props.children}
    </h1>
  );
};

export default TitleComponent;
