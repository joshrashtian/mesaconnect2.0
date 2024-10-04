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
      {...Props}
      className={`flex-row font-eudoxus font-black ${size} flex items-center gap-3 text-orange-700 dark:text-orange-300 ${Props.className}`}
    >
      {Props.children}
    </h1>
  );
};

export default TitleComponent;
