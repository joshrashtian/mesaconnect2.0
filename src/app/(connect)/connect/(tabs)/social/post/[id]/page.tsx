"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostItem, PostType } from "@/_assets/types";
import { supabase } from "../../../../../../../../config/mesa-config";
import { motion } from "framer-motion";

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostType>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      setPost(data);
    };

    fetchData();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  const data = JSON.parse(JSON.stringify(post.data)).data;
  console.log(post)

  return (
    <motion.main
      className=" p-10 gap-5 flex flex-col "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "circInOut" }}
    >
      <ul
        className="p-3 absolute hover:scale-110 shadow-md duration-500 top-6 left-6 cursor-pointer rounded-full bg-white w-16 h-16 flex justify-center items-center"
        onClick={() => {
          router.back();
        }}
      >
        <h1 className="text-3xl font-mono font-bold">{"<"}</h1>
      </ul>

      <ul>
        <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl duration-300">
          {post?.title}
        </h1>
        <h2 className="text-semibold text-zinc-600 text-2xl">
          by @{post?.creator?.username} - {post.type ? post.type : "Post"}
        </h2>
      </ul>

      <section className=" ">
        {data.map((item: PostItem, index: number) => {
          switch (item.type) {
            case "text":
              return (
                <h2 className="text-slate-500" key={index}>
                  {item.text}
                </h2>
              );
            default:
              return null;
          }
        })}
      </section>
    </motion.main>
  );
};

export default PostPage;
