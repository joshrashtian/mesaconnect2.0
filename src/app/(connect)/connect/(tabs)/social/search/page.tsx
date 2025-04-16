"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { SearchPosts } from "./searchData";
import { PostType } from "@/_assets/types";
import SearchInfo from "./SearchInfo";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBackCircle, IoSearchOutline } from "react-icons/io5";
import { gradientObjectDefault, gradientTextDefault } from "@/colors";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchResult, setSearchResult] = useState<PostType[] | undefined>();
  const [searchType, setSearchType] = useState("Posts");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const searchPosts = async () => {
    if (!searchValue) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = await SearchPosts(searchValue);
    await setSearchResult(data);
    setLoading(false);
  };

  useEffect(() => {
    searchPosts();
  }, [searchParams]);

  const onSubmit = () => {
    if (!searchQuery) return;
    router.replace(
      `/connect/social/search/?${createQueryString("search", searchQuery)}`,
    );
  };

  return (
    <motion.main className="flex min-h-full w-full flex-col gap-4">
      <h1
        className={`font-eudoxus font-black ${gradientTextDefault} text-3xl duration-500 lg:text-4xl 2xl:text-5xl`}
      >
        {!searchValue
          ? "What would you like to search for?"
          : `Results for ${searchValue}`}
      </h1>
      <nav className="flex flex-row gap-1.5">
        <input
          className="w-full rounded-2xl p-4 px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] focus:outline-none dark:bg-zinc-700 dark:text-slate-100/50"
          type="search"
          placeholder="Search..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          onClick={() => {
            onSubmit();
          }}
          className={`w-26 scale-100 rounded-2xl p-4 font-eudoxus hover:rounded-md ${gradientObjectDefault} font-bold text-white duration-300 hover:scale-110`}
        >
          <IoSearchOutline size={26} />
        </button>
      </nav>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            key="toptext"
            className="p-10 text-center font-eudoxus text-4xl dark:text-white"
          >
            Loading Search Results
            {Array.from(Array(3).keys()).map((e, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{ y: [10, 0], opacity: [0, 1] }}
                transition={{
                  type: "spring",
                  delay: 0.2 + i * 0.2,
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                .
              </motion.span>
            ))}
          </motion.h1>
        ) : (
          searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <SearchInfo data={searchResult} />
            </motion.div>
          )
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          router.back();
        }}
        className={`absolute right-9 top-12 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full text-orange-800 duration-300 hover:scale-105 hover:text-indigo-600`}
      >
        <IoArrowBackCircle size="100%" />
      </button>
    </motion.main>
  );
};

export default Search;
