"use server";
import React from "react";
import HomePageHeader from "./(homepage)/header";

import { redirect } from "next/navigation";
import { serverside } from "../../../config/serverside";

const page = async () => {
  const { data: Posts, error } = await serverside
    .from("newsposts")
    .select()
    .limit(3);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  console.log(Posts);

  return (
    <main>
      <HomePageHeader />
      <section>
        {Posts.map((post) => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              {post.post_data.map((e: any) => (
                <h1 className={e.style}>{e.text}</h1>
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default page;
