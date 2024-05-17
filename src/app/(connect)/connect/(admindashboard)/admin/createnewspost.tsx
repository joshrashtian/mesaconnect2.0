"use client";
import React, { useState } from "react";
import Tiptap from "@/app/(connect)/connect/builder/(buildercomponents)/TipTap";
import {useCurrentEditor} from "@tiptap/react";

const CreateNews = () => {
  const [title, setTitle] = useState<string>();
  const [json, setJson] = useState<object>();
  const [tags, setTags] = useState<string[]>();

  const { editor } = useCurrentEditor()

    //TODO: Finish The News Editor / Allow Upload
  return (
    <section>
      <h1 className="font-bold font-eudoxus text-3xl ">Create News Article</h1>

        <ul className="flex flex-col gap-2 mt-5">
            <h4 className="font-eudoxus text-xl font-bold">Title</h4>
            <input placeholder="Title of News Article..."
                   className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"/>
            <h4 className="font-eudoxus text-xl font-bold">Content</h4>
            <Tiptap json={(e) => setJson(e)}/>

            <ul>
                <h4 className="font-eudoxus text-xl font-bold mb-2">Tags</h4>
                <input placeholder="Title of News Article..."
                       className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"/>
            </ul>
            <pre>
          {JSON.stringify(json, null, 2)}
      </pre>
        </ul>
    </section>
  );
};

export default CreateNews;
