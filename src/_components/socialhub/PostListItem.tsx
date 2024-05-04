import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PostType } from "@/_assets/types";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import { useUser } from "@/app/AuthContext";
import {
  IoChatboxEllipsesOutline,
  IoPersonOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { supabase } from "../../../config/mesa-config";
import { useModal } from "@/app/(connect)/connect/Modal";
const PostListItem = ({ post, index }: { post: PostType; index: number }) => {
  const data = JSON.parse(JSON.stringify(post.data)).data;
  const router = useRouter();
  const { createContext } = useContextMenu();

  const contextMenu = useContextMenu();
  const user: any = useUser();
  const toast = useToast();
  const { CreateDialogBox } = useModal();

  const contextButtons = [
    {
      name: "View Post",
      visible: true,
      function: () => {
        router.push(`/connect/social/post/${post.id}`);
      },
      icon: <IoChatboxEllipsesOutline />,
    },
    {
      name: "User Profile",
      visible: true,
      function: () => {
        router.push(`/connect/profile/${post.userid}`);
      },
      icon: <IoPersonOutline />,
    },
    {
      name: "Delete Post",
      visible:
        user?.userData?.id === post.userid || user?.userData?.role === "admin",
      function: () =>
        CreateDialogBox(
          <div className="h-full">
            <h1 className=" font-eudoxus text-2xl font-bold ">
              Are You Sure You Would Like To Delete Post
            </h1>
            <h2>{post.title}</h2>
          </div>,
          async () => {
            const { error } = await supabase
              .from("posts")
              .delete()
              .eq("id", post.id);

            if (error) {
              console.error(error);
            }

            toast.CreateSuccessToast("Deleted Post!");
          }
        ),
      icon: <IoTrashBinOutline />,
    },
  ];

  return (
    <motion.ul
      initial={{ x: -20, opacity: 0 }}
      exit={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        ease: "backInOut",
        x: { delay: 0.2 + 0.2 * index },
        opacity: { delay: 0.2 + 0.2 * index },
        duration: 0.2,
      }}
      whileHover={{ scale: 1.02 }}
      className=" p-5 min-h-36 flex flex-col justify-between hover:shadow-lg rounded-sm hover:rounded-xl last:border-b-0 border-b-2 cursor-pointer font-eudoxus hover:scale-[1.005] hover:bg-slate-50 duration-300 w-full bg-white"
      onContextMenu={(e) => {
        createContext(e, contextButtons);
      }}
    >
      <Link href={`/connect/social/post/${post.id}`} className=" ">
        <div className="justify-between flex">
          <h1 className="font-bold text-slate-700">{post.title}</h1>
          <time className="font-bold text-slate-400">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>

        <h1 className=" text-slate-700">{post.creator.realname}</h1>

        <h2 className="text-slate-500">{data[0].text}</h2>
        <h2 className="text-slate-500">{data[1]?.text}</h2>
        <h2 className="text-slate-500">{data[2]?.text}</h2>
      </Link>
      <section className="flex">
        {post.tags?.map((tag) => (
          <h1
            key={tag}
            className="first:border-l-0 border-l-2 border-dashed px-2 "
          >
            {tag}
          </h1>
        ))}
      </section>
    </motion.ul>
  );
};

export default PostListItem;
