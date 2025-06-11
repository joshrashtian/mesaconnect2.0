"use client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const CreateComponent = ({ classes }: { classes: any[] }) => {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [teacherName, setTeacherName] = useState<string>("");
  const router = useRouter();

  const handleAddTeacher = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("teachers").insert({
      id: crypto.randomUUID(),
      name: teacherName,
      teaches: selectedClasses,
    });

    if (error) {
      console.error(error);
    } else {
      //@ts-ignore
      router.push(`/teacher/${data?.id}`);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Input
        placeholder="Teacher Name"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
      />
      <div className="grid grid-cols-4 items-center justify-center gap-4">
        {classes.map((classItem) => (
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
