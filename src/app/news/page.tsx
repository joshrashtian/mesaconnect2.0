"use server";
import React from "react";
import HomePageHeader from "./(homepage)/header";

import { redirect } from "next/navigation";
import { serverside } from "../../../config/serverside";
import Article from "./Article";

const Page = async () => {
  const { data: Posts, error } = await serverside
    .from("newsposts")
    .select()
    .limit(3);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  return (
    <main className="flex flex-col gap-3">
      <HomePageHeader />
      <section className="p-3">
        {Posts.map((post) => {
          return <Article key={post.id} article={post} />;
        })}
      </section>
    </main>
  );
};

export default Page;
