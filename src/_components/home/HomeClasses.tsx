"use client";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import React, { useState } from "react";

const HomeClasses = () => {
  const [classes, setClasses] = useState<ClassType[] | null>();

  if (!classes) return null;
  return (
    <div>
      <h1>Upcming Classes</h1>
      <div>
        {classes.map((c) => (
          <div key={c.id}>
            <h2>{c.name}</h2>
            <p>{c.num}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeClasses;
