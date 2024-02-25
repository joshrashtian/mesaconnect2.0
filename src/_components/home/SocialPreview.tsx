import React from "react";
import { motion } from "framer-motion";

const List = [
  {
    name: "Express Yourself",
  },
];

const SocialPreview = () => {
  return (
    <motion.section className="flex flex-row p-10 w-screen h-screen">
      <section className="w-1/2">
        {List.map((item, index) => {
          return <h1>{item.name}</h1>;
        })}
      </section>
      <section className="w-1/2">
        <h1>Test</h1>
      </section>
    </motion.section>
  );
};

export default SocialPreview;
