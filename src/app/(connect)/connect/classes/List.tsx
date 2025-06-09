"use client";
import React from "react";
import { ClassType } from "../builder/(buildercomponents)/ClassRelations";

const List = ({ classes }: { classes: ClassType[] }) => {
  return (
    <div>
      {classes.map((c: ClassType) => (
        <div key={c.id}>
          <h1>
            {c.name} - {c.num}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default List;
