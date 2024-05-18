"use server";
import React, {Suspense} from "react";
import HomePageHeader from "./(homepage)/header";

import { redirect } from "next/navigation";
import { serverside } from "../../../config/serverside";
import Article from "./Article";
import Provider from "@/app/news/Provider";

async function getData() {
    const { data, error } = await serverside
        .from("newsposts")
        .select()
        .limit(3);

    if (error) {
        console.error(error);
        redirect("/error");
    }
    return { data }
}

const Page = async () => {
  const { data: Posts} = await getData();
  return (
    <main className="flex flex-col gap-3">
      <HomePageHeader />
      <Suspense>
          <Provider>
        {Posts.map((post) => {
          return <Article key={post.id} article={post} />;
        })}
          </Provider>
      </Suspense>
    </main>
  );
};

export default Page;
