import { gradientTextDefault } from "@/colors";
import React from "react";

type ParagraphComponentType = {
  size?: "small" | "medium" | "large";
} & React.HTMLAttributes<HTMLHeadingElement>;

const ParagraphComponent = (Props: ParagraphComponentType) => {
  const size =
    Props.size === "small"
      ? "text-base"
      : Props.size === "medium"
      ? "text-lg"
      : "text-xl";

  return (
    <p
      className={`font-eudoxus flex-row ${size} text-zinc-600 dark:text-zinc-50 items-center gap-3 
        flex ${Props.className}`}
      {...Props}
    >
      {Props.children}
    </p>
  );
};

export default ParagraphComponent;
