"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PostItem, PostType } from "@/_assets/types";
import { supabase } from "../../../../../../../../config/mesa-config";

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq('id', params.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

       setPost(data[0]);
    };

    fetchData();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  const data = (JSON.parse(JSON.stringify(post.data))).data

  return (
  <main>
    <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl duration-300">{post?.title}</h1>
    <h2 className="text-semibold text-zinc-600 text-2xl">by {post?.userId}</h2>
    
    {
      data.map((item: PostItem, index: number) => {
        switch (item.type) {
          case 'text':
            return <h2 className="text-slate-500" key={index}>{item.text}</h2>
          default:
            return null
        }
      })
    }
    </main>
  )
};

export default PostPage;
