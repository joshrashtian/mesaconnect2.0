"use client";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../../../config/mesa-config";
import { searchTeachers } from "./searchForTeachers";
import { Teacher } from "../(components)/RecentReviewsCarousel";
import { motion } from "framer-motion";
import { IoClose, IoSearch } from "react-icons/io5";
const SearchPage = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const router = useRouter();
  const handleSearch = () => {
    if (search.length > 0) {
      router.replace(`/teacher/search?search=${search}`);
    }
  };

  const [data, setData] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function searchForTeacher() {
    setIsLoading(true);
    const response = await searchTeachers(search);
    setData(response);
    setIsLoading(false);
  }

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    searchForTeacher();
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4 p-4 font-eudoxus">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <h1 className="text-2xl font-bold">Search</h1>
      </div>
      <header className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-16 w-full rounded-full border-2 border-gray-300 p-4 px-8 text-lg shadow-md"
        />
        <Button
          variant="outline"
          className="h-16 w-16 rounded-full p-4 text-lg shadow-md"
          onClick={handleSearch}
        >
          <IoSearch />
        </Button>
        <Button
          variant="outline"
          className="h-16 w-16 rounded-full p-4 text-lg shadow-md"
          onClick={() => setSearch("")}
        >
          <IoClose />
        </Button>
      </header>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        {data.map((teacher: Teacher, index: number) => (
          <motion.li
            className="flex cursor-pointer items-center gap-4 rounded-lg bg-white p-4 shadow-md duration-300 hover:bg-gray-100"
            key={teacher.id}
            onClick={() => router.push(`/teacher/${teacher.id}`)}
            initial={{ opacity: 0, y: 10 * index }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
          >
            <div className="h-3 w-3 rounded-full bg-black"></div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-sm text-gray-500">{teacher.category}</p>
              <p className="text-sm text-gray-500">
                Known to teach {teacher?.classes?.join(", ")}.
              </p>
            </div>
          </motion.li>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
