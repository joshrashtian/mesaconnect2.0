"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { SearchPosts } from "./searchData";
import { EventType, PostType } from "@/_assets/types";
import SearchInfo from "./SearchInfo";
import { AnimatePresence, motion } from "framer-motion";
import { TbMessageSearch } from "react-icons/tb";
import {
  IoArrowBackCircle,
  IoSearchCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";

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
    [searchParams]
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
      `/connect/social/search/?${createQueryString("search", searchQuery)}`
    );
  };

  return (
    <motion.main className="flex flex-col w-full min-h-full gap-4 ">
      <h1 className="font-bold text-4xl text-transparent font-eudoxus bg-clip-text inline-block bg-gradient-to-br from-orange-800 to-indigo-600">
        {!searchValue
          ? "What would you like to search for?"
          : `Results for ${searchValue}`}
      </h1>
      <nav className="flex flex-row gap-1.5">
        <input
          className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"
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
          className="p-4 w-26 scale-100 rounded-2xl font-eudoxus hover:rounded-md bg-gradient-to-br from-red-500 to-amber-600 hover:bg-indigo-700 text-white hover:scale-110 duration-300 font-bold"
        >
          <IoSearchOutline size={26} />
        </button>
      </nav>
      <AnimatePresence>
        {loading ? (
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            className="text-4xl text-center p-10 font-eudoxus"
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
          searchResult && <SearchInfo data={searchResult} />
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          router.back();
        }}
        className="absolute cursor-pointer right-9 top-12 text-orange-800 hover:text-indigo-600  w-16 h-16 flex justify-center items-center hover:scale-105 duration-300 rounded-full"
      >
        <IoArrowBackCircle size="100%" />
      </button>
    </motion.main>
  );
};

export default Search;
