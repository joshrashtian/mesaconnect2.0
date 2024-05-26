"use client";
import React, {useRef, useState} from "react";
import Tiptap from "@/app/(connect)/connect/builder/(buildercomponents)/TipTap";
import {motion} from "framer-motion";
import {useUser} from "@/app/AuthContext";
import {UploadNews} from "@/app/(connect)/connect/(admindashboard)/admin/ServerActions";
import {useToast} from "@/app/(connect)/InfoContext";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {supabase} from "../../../../../../config/mesa-config";

const CreateNews = () => {
  const [title, setTitle] = useState<string>();
  const [json, setJson] = useState<object>();
  const [tags, setTags] = useState<string[]>();
  const [image, setImage] = useState<File>()

  const inputRef = useRef<any>(null)

  const { userData } = useUser()
    const router = useRouter()
    const toast = useToast()

  const Upload = async () => {
      if(!title || !json || !tags ) {
          toast.CreateErrorToast("Please Fill Out All Fields!")
          return;
      }

      const { data, error } = await UploadNews({ title, tags, contents: json }, userData)

    if(error) {
      toast.CreateErrorToast(error.message)
      return
    }

    if(image) {
      const { error: StorageError } = await supabase
        .storage
        .from('NewsPictures')
        //@ts-ignore
        .upload(`${data[0].id}/context.png`, image)

      if(StorageError) {
        toast.CreateErrorToast(StorageError.message)
        return
      } else {
        toast.CreateSuccessToast("Successfully Posted!")
        router.push('/news')
      }
    }


  }

    //TODO: Finish The News Editor / Allow Upload
  return (
      <section>
          <h1 className="font-bold font-eudoxus text-3xl ">Create News Article</h1>

          <ul className="flex flex-col gap-2 mt-5">
              <h4 className="font-eudoxus text-xl font-bold">Title</h4>
              <input placeholder="Title of News Article..."
                     onChange={(e) => setTitle(e.target.value)}
                     className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"/>
            { image &&
              <Image src={URL.createObjectURL(image)} alt="context" height={300} width={300} />
            }

              <h4 className="font-eudoxus text-xl font-bold">Content</h4>
              <Tiptap json={(e) => setJson(e)}/>

              <ul>
                  <h4 className="font-eudoxus text-xl font-bold mb-2">Tags</h4>
                  <input placeholder="Tags..."
                         onChange={(e) => {setTags(e.target.value
                             .split(',')
                             .map((e) => e.trim())
                             .filter((e) => e.length > 0))}}
                         className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"/>
                  <div className="flex mt-2 gap-2">
                  {tags?.map((e) => {
                      return (
                          <ul key={e} className="bg-zinc-50 shadow-md p-2 px-4 rounded-xl">
                              <h1>{e}</h1>
                          </ul>
                      )
                  })}
                  </div>
              </ul>

            <motion.footer
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="flex flex-row gap-4 items-center w-1/3"
            >
              <button
                onClick={() => {inputRef.current.click()}}
                className={`w-full h-12  bg-gradient-to-br  hover:scale-105 duration-500 from-theme-blue to-theme-blue-2 shadow-lg z-40 text-white font-bold rounded-2xl`}
              >
                Upload Image
              </button>
              <input hidden ref={inputRef} type="file" accept="image/*" onChange={(e) => {
                //@ts-ignore
                setImage(e.target.files[0])}} />
              <button
                onClick={async () => await Upload()}
                className={`w-full h-12 ${json && title ? "bg-gradient-to-br" : " bg-slate-400"}  hover:scale-105 duration-500 from-theme-blue to-theme-blue-2 shadow-lg z-40 text-white font-bold rounded-2xl`}
              >
                Submit
              </button>
            </motion.footer>
          </ul>
        <pre>
          {JSON.stringify(json, null, 2)}

      </pre>
      </section>
  );
};

export default CreateNews;
