"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import Link from "next/link";
import { IoAdd, IoPersonAdd } from "react-icons/io5";
import { useUser } from "@/app/AuthContext";
import { Review } from "./page";
import { Button } from "@/components/ui/button";

interface Teacher {
  id: string;
  name: string;
}

export default function TeacherSearch() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { userData } = useUser();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [yourReviews, setYourReviews] = useState<
    { id: string; teacher_id: string; rating: number; teacher: Teacher }[]
  >([]);
  // 1. Keyboard shortcut to open/close (⌘+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // 2. Debounced search function
  const fetchTeachers = useCallback(
    async (q: string) => {
      if (!q) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("teachers")
        .select("id, name")
        .ilike("name", `%${q}%`)
        .limit(10);

      if (error) {
        console.error("Search error:", error);
        setResults([]);
      } else {
        setResults(data ?? []);
      }
      setLoading(false);
    },
    [supabase, query],
  );

  async function fetchYourReviews() {
    const { data, error } = await supabase
      .from("teacher_reviews")
      .select("teacher_id, rating")
      .eq("user_id", userData?.id);

    if (error) {
      console.error("Error fetching your reviews:", error);
    } else {
      const { data: teachers, error: teachersError } = await supabase
        .from("teachers")
        .select("id, name")
        .in("id", data?.map((r) => r.teacher_id) ?? []);

      if (teachersError) {
        console.error("Error fetching teachers:", teachersError);
      }

      const reviews = data?.map((r) => ({
        ...r,
        teacher: teachers?.find((t) => t.id === r.teacher_id),
      }));
      //@ts-ignore
      setYourReviews(reviews ?? []);
    }
  }

  // 3. Kick off search whenever the input changes
  useEffect(() => {
    fetchTeachers(query);
  }, [query, fetchTeachers]);

  useEffect(() => {
    if (userData?.id) {
      fetchYourReviews();
    }
  }, [userData?.id]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        className="bg-white/40 bg-clip-padding backdrop-blur-sm backdrop-filter"
        placeholder="Search for a teacher..."
        value={query}
        onValueChange={(val) => setQuery(val)}
        autoFocus
      />
      {!userData?.id && (
        <div className="m-3 flex flex-col items-start justify-start rounded-lg bg-gradient-to-br from-blue-400/80 to-blue-500/60 p-3">
          <div className="text-white">
            Create an account to rate reviews, add teachers, and create your
            own.
          </div>
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={() => {
              setOpen(false);
              router.push("/sign-in");
            }}
          >
            Sign Up
          </Button>
        </div>
      )}
      <CommandList>
        {loading && <CommandEmpty>Searching…</CommandEmpty>}
        {!loading && query && results.length === 0 && (
          <CommandEmpty>No teachers found.</CommandEmpty>
        )}

        <CommandGroup heading="Your Reviews">
          {yourReviews.map((r) => (
            //@ts-ignore
            <CommandItem
              key={r.id}
              onSelect={() => {
                setOpen(false);
                router.push(`/teacher/${r.teacher_id}`);
              }}
              className="flex flex-row items-start justify-between p-0"
            >
              <p className="text-md font-bold">{r.teacher?.name}</p>
              <p className="text-sm text-gray-500">{r.rating}</p>
            </CommandItem>
          ))}
        </CommandGroup>
        {!loading && results.length > 0 && (
          <CommandGroup heading="Teachers">
            {results.map((t) => (
              <CommandItem
                key={t.id}
                className="cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  router.push(`/teacher/${t.id}`);
                }}
              >
                {t.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {userData?.verified && (
          <CommandGroup heading="Verified Users">
            <CommandItem
              className="cursor-pointer"
              onSelect={() => {
                setOpen(false);
                router.push("/teacher/create");
              }}
            >
              <IoPersonAdd /> Add Teacher
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
