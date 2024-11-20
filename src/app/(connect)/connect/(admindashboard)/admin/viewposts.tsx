"use client";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { PostType } from "@/_assets/types";
import { AdminModal } from "../AdminModal";
import { DataTable } from "./(tables)/posts/datatable";
import { columns } from "./(tables)/posts/columns";

const Viewposts = () => {
  const [data, setData] = useState<PostType[]>();
  const [filter, setFilter] = useState();

  const Modal: any = useContext(AdminModal);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select();

      if (error) {
        console.error(error);
        return;
      }

      // @ts-ignore
      setData(data);
    };

    fetchData();
  }, []);

  const replaceData = () => {};

  if (!data) return;

  return (
    <main className="flex w-full flex-col">
      <DataTable columns={columns} data={data} />
      {/* <div className="bg-slate-100 font-eudoxus no-scrollbar rounded-t-2xl flex-row text-center justify-between text-nowrap rounded-md w-full h-16 overflow-x-scroll p-4 gap-5 flex  items-center">
        <h1>Title</h1>
        <h1>Post ID</h1>
        <h1>Creator</h1>
        <h1 className="capitalize">Type</h1>
        <h1>Created At</h1>
      </div>
      <section className='" w-full flex flex-col overflow-y-scroll "'>
        {data.map((post: PostType) => (
          <div
            onClick={() => Modal.createModal("post")}
            key={post.id}
            className="bg-white duration-300 no-scrollbar font-eudoxus text-slate-500 odd:bg-zinc-50 hover:bg-slate-50 hover:odd:bg-zinc-100 odd:border-y-2  cursor-pointer text-nowrap last:rounded-b-2xl w-full h-16 overflow-x-scroll p-4 gap-5 flex justify-between items-center"
          >
            <h1>
              {post.type === "post"
                ? post.title.slice(0, 10) + "..."
                : post.data.data.text.slice(0, 10) + "..."}
            </h1>
            <h1>{post.id.slice(0, 5) + "..."}</h1>
            <h1>
              {post.creator.name ? post.creator.name : post.creator.realname}
            </h1>
            <h1 className="capitalize">{post.type}</h1>
            <h1>{post.created_at.toString().slice(0, 10)}</h1>
          </div>
        ))}
      </section> */}
    </main>
  );
};

export default Viewposts;
