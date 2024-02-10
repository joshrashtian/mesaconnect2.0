import React from "react";

const Benefits = () => {
  const benefits = [
    {
      title: "Tutoring / Mentorship",
    },
    {
      title: "New Opportunities",
    },
    {
      title: "Socialization"
    }
  ];

  return (
    <main className="w-full flex flex-row justify-center gap-24">
      {benefits.map((benefit, index) => {
        return (
          <section className=" " key={index}>
            <h2 className="text-2xl">{benefit.title}</h2>
          </section>
        );
      })}
    </main>
  );
};

export default Benefits;
