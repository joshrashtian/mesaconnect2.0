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

  // 3. Kick off search whenever the input changes
  useEffect(() => {
    fetchTeachers(query);
  }, [query, fetchTeachers]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        className="bg-white/40 bg-clip-padding backdrop-blur-sm backdrop-filter"
        placeholder="Search for a teacher..."
        value={query}
        onValueChange={(val) => setQuery(val)}
        autoFocus
      />
      <CommandList>
        {loading && <CommandEmpty>Searching…</CommandEmpty>}
        {!loading && query && results.length === 0 && (
          <CommandEmpty>No teachers found.</CommandEmpty>
        )}
        <CommandGroup heading="Basic Commands">
          <CommandItem>Account Information</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Your Reviews">
          <CommandItem>Your Reviews</CommandItem>
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
