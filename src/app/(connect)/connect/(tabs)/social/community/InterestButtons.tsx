import { useUser } from "@/app/AuthContext";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { byTag } from "./PostsPageQueries";
import { PostType } from "@/_assets/types";
import {
  IoAdd,
  IoArrowDown,
  IoBook,
  IoChevronDown,
  IoCode,
  IoCodeDownload,
  IoFlask,
  IoGameController,
} from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Reorder } from "framer-motion";
import { IoIosInfinite } from "react-icons/io";

export type Interest = {
  id?: string;
  interest: string;
  fieldType: string;
  userid?: string;
};

export const icons = [
  {
    name: "Computer Science",
    icon: <IoCode />,
  },
  {
    name: "Biology",
    icon: <IoFlask />,
  },
  {
    name: "School",
    icon: <IoBook />,
  },
  {
    name: "Video Games",
    icon: <IoGameController />,
  },
  {
    name: "Physics",
    icon: <IoIosInfinite />,
  },
];

const InterestButtons = ({
  newInfo,
  reload,
}: {
  newInfo: (e: PostType[]) => void;
  reload: () => void;
}) => {
  const { user } = useUser();
  const [interests, setInterests] = useState<Interest[]>([]);

  const params = useSearchParams();

  const [selected, setSelected] = useState<string>();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  function handleParams(term?: string) {
    const search = new URLSearchParams(params);
    if (term) {
      search.set("by", term);
    } else {
      search.delete("by");
    }
    replace(`${pathname}?${search.toString()}`);
  }

  useEffect(() => {
    const getInterests = async () => {
      const { data, error } = await supabase
        .from("interests")
        .select("*")
        .eq("userid", user?.id)
        .limit(4);

      if (error) {
        console.log(error);
        return;
      }
      setInterests(data);
    };

    getInterests();
  }, []);
  return (
    <Reorder.Group
      axis="x"
      values={interests}
      onReorder={setInterests}
      className="flex items-center md:gap-1"
    >
      {interests?.map((interest) => (
        <Reorder.Item value={interest} key={interest.id}>
          <button
            className={`p-2 ${
              selected === interest.interest
                ? "text-orange-800 hover:text-orange-900 bg-orange-100 hover:bg-orange-200 active:bg-orange-300"
                : "text-slate-800 hover:text-black hover:bg-slate-200 active:bg-slate-300"
            } duration-300 font-eudoxus text-sm xl:text-base flex flex-col lg:flex-row items-center gap-2 rounded-xl px-0.5 md:px-3 lg:px-6 active:scale-95`}
            onClick={async () => {
              const posts = await byTag(interest.interest);

              if (posts.error) return;
              else if (!posts.data) return;
              else {
                newInfo(posts.data);
                setSelected(interest.interest);
                handleParams(interest.interest);
              }
            }}
          >
            {icons.find((e) => interest.fieldType === e.name)?.icon}
            {interest.interest}
          </button>
        </Reorder.Item>
      ))}
      <ul className="text-slate-800 p-2 rounded-full duration-300 hover:text-black hover:bg-slate-200 active:bg-slate-300">
        {interests && interests.length < 3 ? (
          <IoChevronDown />
        ) : (
          <IoAdd onClick={() => push("/connect/builder?type=interests")} />
        )}
      </ul>
    </Reorder.Group>
  );
};

export default InterestButtons;
