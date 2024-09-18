"use server";
import React from "react";
import { serverside } from "../../../../../../../../config/serverside";
import ClassesRegister from "./classes";
import LoadingPage from "@/_components/LoadingPage";
import { Metadata } from "next";
import TitleComponent from "@/(mesaui)/title";

export async function generateMetadata() {
  return {
    title: "Adding Course",
  };
}

const SelectClasses = async () => {
  const { data } = await serverside
    .schema("information")
    .from("classes")
    .select();

  return (
    <div>
      <TitleComponent style={{ marginBottom: 12 }} size="small">
        New Classes
      </TitleComponent>
      <section>
        {data ? <ClassesRegister classes={data} /> : <LoadingPage />}
      </section>
    </div>
  );
};

export default SelectClasses;
