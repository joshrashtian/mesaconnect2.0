"use client";
import React, { Suspense, useState } from "react";
import { useGPA } from "./layout";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoCalendar, IoFlower, IoLeaf, IoSnow, IoSunny } from "react-icons/io5";
const AddClass = () => {
  const { AddClassToSemester } = useGPA();
  const [classData, setClassData] = useState<ClassType>({
    name: "",
    grade: "P",
    units: 3,
    semester: "",
    id: "",
    num: 0,
    category: "",
  });

  const [semester, setSemester] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  function handleSemesterChange() {
    if (!year || !semester || !classData.grade || !classData.units) {
      alert("Please fill out all fields");
      return;
    }

    let newClass = {
      ...classData,
      semester: `${semester} ${year}`,
    };

    AddClassToSemester(newClass);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="h-84 mt-2 flex w-full flex-col gap-4 rounded-xl bg-white p-3 shadow-lg"
    >
      <div className="flex flex-col gap-2 bg-zinc-50 p-3 text-muted-foreground">
        <h3 className="text-sm font-bold">Add Class</h3>
        <p className="text-sm text-muted-foreground">
          {classData.category || "Category"} {classData.num} |{" "}
          {classData.semester || "Semester"} | {classData.grade} |{" "}
          {classData.units} Units
        </p>
      </div>
      <Input
        type="text"
        name="name"
        value={classData.name}
        placeholder="Class Name..."
        onChange={handleChange}
      />
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          name="category"
          value={classData.category}
          placeholder="Category..."
          onChange={handleChange}
        />
        <Input
          type="number"
          name="num"
          value={classData.num}
          placeholder="Class ID Number..."
          onChange={(e) =>
            setClassData({ ...classData, num: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          type="number"
          name="units"
          value={classData.units}
          onChange={(e) =>
            setClassData({ ...classData, units: parseInt(e.target.value) })
          }
          placeholder="Units..."
        />
        <Input
          type="number"
          name="year"
          placeholder="Year..."
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Select Grade</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Grade</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              "A",
              "B",
              "C",
              "D",
              "F",
              "P",
              "IP",
              "NP",
              "W" as ClassType["grade"],
            ].map((grade) => (
              <DropdownMenuCheckboxItem
                key={grade}
                checked={classData.grade === grade}
                //@ts-ignore
                onClick={() => setClassData({ ...classData, grade })}
              >
                {grade}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Select Semester</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Semester</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { time: "Fall", icon: <IoLeaf /> },
              { time: "Spring", icon: <IoFlower /> },
              { time: "Summer", icon: <IoSunny /> },
              { time: "Winter", icon: <IoSnow /> },
            ].map((time) => (
              <DropdownMenuCheckboxItem
                key={time.time}
                checked={semester === time.time}
                //@ts-ignore
                onSelect={() => setSemester(time.time)}
              >
                {time.icon} {"  "}
                {time.time}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button onClick={handleSemesterChange}>Add Class</Button>
    </motion.div>
  );
};

export default AddClass;
