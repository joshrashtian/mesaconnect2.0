"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { SearchPosts } from "./searchData";
import { EventType, PostType } from "@/_assets/types";
import SearchInfo from "./SearchInfo";

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
  }, []);

  const onSubmit = () => {
    if (!searchQuery) return;
    router.replace(
      `/connect/social/search/?${createQueryString("search", searchQuery)}`
    );
    searchPosts();
  };

  return (
    <main className="flex flex-col w-full min-h-full gap-4 ">
      <h1 className="font-bold text-4xl text-transparent bg-clip-text inline-block bg-gradient-to-r from-orange-800 to-black">
        What would you like to search for?
      </h1>
      <nav className="flex flex-row gap-5">
        <input
          className="p-4 shadow-md focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-full px-6"
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
          className="p-4 w-40 rounded-full bg-blue-500 text-white hover:scale-105 duration-300 font-bold"
        >
          Submit
        </button>
      </nav>

      {searchType === "Posts" && !searchResult ? (
        loading ? (
          <h1 className="text-xl ">Loading Search Results...</h1>
        ) : (
          <h1></h1>
        )
      ) : (
        searchResult && <SearchInfo data={searchResult} />
      )}
      <button
        onClick={() => {
          router.back();
        }}
        className="absolute cursor-pointer right-6 top-6 bg-white w-16 h-16 flex justify-center items-center hover:scale-105 duration-300 rounded-full"
      >
        <h1 className="font-mono text-2xl">X</h1>
      </button>
    </main>
  );
};

export default Search;
