import React from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiPresentationChartBar } from "react-icons/hi";
import { IoPeopleCircle } from "react-icons/io5";

const Benefits = () => {
  const benefits = [
    {
      title: "Tutoring / Mentorship",
      icon: <HiPresentationChartBar />,
    },
    {
      title: "New Opportunities",
      icon: <BsPersonWorkspace />,
    },
    {
      title: "Socialization",
      icon: <IoPeopleCircle />,
    },
  ];

  return (
    <main className="flex w-full flex-col justify-center gap-24 lg:flex-row">
      {benefits.map((benefit, index) => {
        return (
          <section
            className="flex flex-col items-center justify-center"
            key={index}
          >
            <h1 className="text-5xl duration-300 hover:scale-105 hover:text-orange-500">
              {benefit.icon}
            </h1>
            <h2 className="font-eudoxus text-2xl">{benefit.title}</h2>
          </section>
        );
      })}
    </main>
  );
};

export default Benefits;
