"use client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const CreateComponent = ({ classes }: { classes: any[] }) => {
  const [filteredClasses, setFilteredClasses] = useState<any[]>(classes);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [teacherName, setTeacherName] = useState<string>("");
  const [teacherCategory, setTeacherCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  async function getClasses() {
    const supabase = createClientComponentClient();
    if (!search || search === "") {
      setFilteredClasses(classes);
      return;
    }
    const { data, error } = await supabase
      .schema("information")
      .from("classes")
      .select("*")
      .textSearch("search_class", search);

    if (error) {
      console.error(error);
    }
    setFilteredClasses(data ?? []);
  }
  const handleAddTeacher = async () => {
    const supabase = createClientComponentClient();

    if (
      teacherName === "" ||
      teacherCategory === "" ||
      selectedClasses.length === 0
    ) {
      alert("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase.from("teachers").insert({
      id: crypto.randomUUID(),
      name: teacherName,
      teaches: selectedClasses,
      category: teacherCategory,
    });

    if (error) {
      console.error(error);
    } else {
      //@ts-ignore
      router.push(`/teacher`);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Input
        placeholder="Teacher Name"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
      />
      <Input
        placeholder="Teacher Category"
        value={teacherCategory}
        onChange={(e) => setTeacherCategory(e.target.value)}
      />
      <Separator className="my-4" />
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <Input
          placeholder="Search for Classes..."
          value={search}
          className="w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={getClasses}
          className="w-64 bg-blue-500 text-white hover:bg-blue-600"
        >
          Search
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="grid w-full grid-cols-4 items-center justify-center gap-4">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="flex h-24 w-full flex-col items-start justify-start rounded-lg bg-white p-4 shadow-md"
          >
            <Checkbox
              checked={selectedClasses.includes(classItem.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedClasses([...selectedClasses, classItem.id]);
                } else {
                  setSelectedClasses(
                    selectedClasses.filter((id) => id !== classItem.id),
                  );
                }
              }}
            />
            <p
              className={`${classItem.name.length > 24 ? "text-sm" : "text-lg"} font-bold ${
                selectedClasses.includes(classItem.id) ? "text-blue-500" : ""
              }`}
            >
              {classItem.name}
            </p>
            <p className="text-sm text-gray-500">
              {classItem.category} {classItem.num}
            </p>
          </div>
        ))}
      </div>
      <nav className="fixed bottom-0 left-0 flex h-32 w-full items-center justify-center p-4">
        <nav className="flex h-16 w-64 items-center justify-between gap-3 rounded-full bg-white p-4 shadow-lg">
          <Button
            className="w-full bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleAddTeacher}
          >
            <IoAdd /> Add Teacher
          </Button>
        </nav>
      </nav>
    </div>
  );
};

export default CreateComponent;
