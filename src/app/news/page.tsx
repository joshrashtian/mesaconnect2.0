"use server";
import React, {Suspense} from "react";
import HomePageHeader from "./(homepage)/header";

import {redirect} from "next/navigation";
import {serverside} from "../../../config/serverside";
import Article from "./Article";
import Provider from "@/app/news/Provider";

async function getData() {
    const { data, error } = await serverside
        .from("newsposts")
        .select()
        .limit(3).order('created_at', { ascending: false })


    if (error) {
        console.error(error);
        redirect("/error");
    }
    return { data, error }
}

const Page = async () => {
  const { data: Posts, error} = await getData();

  const { data: NewsPictures, error: NewsError } = await serverside
    .storage
    .from('NewsPictures')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })

  if(error || NewsError) {
      return (
        <>
          <h1>Oops! An Error Has Occured</h1>
          <h2>{NewsError?.message}</h2>
        </>
      )
  }

  return (
    <main className="flex flex-col gap-3 dark:from-slate-800 dark:to-orange-950 bg-gradient-to-b from-zinc-100 from-[40%] to-orange-100 dark:bg-gradient-to-b p-16 min-h-screen duration-700">
      <HomePageHeader title="News" />
      <Suspense>
          <Provider>
        {Posts.map((post) => {
          return <Article key={post.id} article={post} image={!!NewsPictures?.find(e => Number(e.name) === post.id)}/>;
        })}
          </Provider>
      </Suspense>
    </main>
  );
};

export default Page;
