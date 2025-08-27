"use client";
import React, { useRef, useState } from "react";
import Tiptap from "@/app/(connect)/connect/builder/(buildercomponents)/TipTap";
import { motion } from "framer-motion";
import { useUser } from "@/app/AuthContext";
import { UploadNews } from "@/app/(connect)/connect/(admindashboard)/admin/ServerActions";
import { useToast } from "@/app/(connect)/InfoContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../../../../../config/mesa-config";

const CreateNews = () => {
  const [title, setTitle] = useState<string>();
  const [json, setJson] = useState<object>();
  const [tags, setTags] = useState<string[]>();
  const [image, setImage] = useState<File>();

  const inputRef = useRef<any>(null);

  const { userData } = useUser();
  const router = useRouter();
  const toast = useToast();

  const Upload = async () => {
    const hasTitle = (title?.trim().length ?? 0) > 0;
    const hasContent =
      Array.isArray((json as any)?.content) &&
      ((json as any)?.content?.length ?? 0) > 0;
    const hasTags = (tags?.length ?? 0) > 0;

    if (!hasTitle || !hasContent || !hasTags) {
      toast.CreateErrorToast("Please Fill Out All Fields!");
      return;
    }

    const finalTitle = (title as string).trim();
    const finalTags = tags as string[];
    const finalJson = json as object;

    const { data, error } = await UploadNews(
      { title: finalTitle, tags: finalTags, contents: finalJson },
      userData,
    );

    if (error) {
      toast.CreateErrorToast(error.message);
      return;
    }

    if (image) {
      const { error: StorageError } = await supabase.storage
        .from("NewsPictures")
        //@ts-ignore
        .upload(`${data[0].id}/context.png`, image);

      if (StorageError) {
        toast.CreateErrorToast(StorageError.message);
        return;
      } else {
        toast.CreateSuccessToast("Successfully Posted!");
        router.push("/news");
      }
    } else {
      toast.CreateSuccessToast("Successfully Posted!");
      router.push("/news");
    }
  };

  return (
    <section>
      <h1 className="font-eudoxus text-3xl font-bold">Create News Article</h1>

      <ul className="mt-5 flex flex-col gap-2">
        <h4 className="font-eudoxus text-xl font-bold">Title</h4>
        <input
          placeholder="Title of News Article..."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl p-4 px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
        />
        <p className="text-sm text-slate-500">
          {title?.length ?? 0} characters
        </p>
        {image && (
          <Image
            src={URL.createObjectURL(image)}
            alt="context"
            height={300}
            width={300}
          />
        )}

        <h4 className="font-eudoxus text-xl font-bold">Content</h4>
        <Tiptap json={(e) => setJson(e)} components={[]} />

        <ul>
          <h4 className="mb-2 font-eudoxus text-xl font-bold">Tags</h4>
          <input
            placeholder="Tags..."
            onChange={(e) => {
              setTags(
                e.target.value
                  .split(",")
                  .map((e) => e.trim())
                  .filter((e) => e.length > 0),
              );
            }}
            className="w-full rounded-2xl p-4 px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
          />
          <div className="mt-2 flex gap-2">
            {tags?.map((e) => {
              return (
                <ul
                  key={e}
                  className="rounded-xl bg-zinc-50 p-2 px-4 shadow-md"
                >
                  <h1>{e}</h1>
                </ul>
              );
            })}
          </div>
        </ul>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex w-1/3 flex-row items-center gap-4"
        >
          <button
            onClick={() => {
              inputRef.current.click();
            }}
            className={`z-40 h-12 w-full rounded-2xl bg-gradient-to-br from-theme-blue to-theme-blue-2 font-bold text-white shadow-lg duration-500 hover:scale-105`}
          >
            Upload Image
          </button>
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              //@ts-ignore
              setImage(e.target.files[0]);
            }}
          />
          <button
            onClick={async () => await Upload()}
            disabled={
              !(
                (title?.trim().length ?? 0) > 0 &&
                Array.isArray((json as any)?.content) &&
                ((json as any)?.content?.length ?? 0) > 0 &&
                (tags?.length ?? 0) > 0
              )
            }
            className={`h-12 w-full ${(title?.trim().length ?? 0) > 0 && Array.isArray((json as any)?.content) && ((json as any)?.content?.length ?? 0) > 0 && (tags?.length ?? 0) > 0 ? "bg-gradient-to-br from-theme-blue to-theme-blue-2" : "bg-slate-400"} z-40 rounded-2xl font-bold text-white shadow-lg duration-500 hover:scale-105 disabled:cursor-not-allowed`}
          >
            Submit
          </button>
        </motion.footer>
      </ul>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </section>
  );
};

export default CreateNews;
