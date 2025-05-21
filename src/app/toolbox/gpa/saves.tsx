import { useUser } from "@/app/AuthContext";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../config/mesa-config";
import { useGPA } from "./layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
const Saves = () => {
  const { user, userData } = useUser();
  const { gpa, setCourses } = useGPA();
  const [saves, setSaves] = useState<any[]>([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchSaves = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .from("saves.gpa")
        .select("*")
        .eq("userid", user?.id || "");
      setSaves(data || []);
    };
    fetchSaves();
  }, [user]);

  return (
    <div className="mt-2 flex h-96 w-full flex-col gap-4 overflow-y-scroll rounded-xl bg-white p-3 shadow-lg">
      <header className="flex flex-row justify-between gap-2">
        <h1 className="text-lg font-bold">Previous GPA Saves</h1>
        <Avatar>
          <AvatarImage src={userData?.avatar_url} />
          <AvatarFallback>{userData?.real_name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </header>
      <Button
        onClick={async () => {
          const { data, error } = await supabase
            .from("transcripts")
            .select("*")
            .eq("userid", user?.id ?? "");

          if (error) {
            console.error(error);
          } else {
            //@ts-ignore
            setCourses(data);
          }
        }}
      >
        Import Classes
      </Button>
      {saves.map((save) => (
        <div
          key={save.id}
          className="flex flex-row items-center justify-between gap-2"
        >
          <div className="text-lg font-bold">{save.name}</div>
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                let courses: ClassType[] = [];

                save.data.map((s: any) => {
                  s.courses.map((c: any) => {
                    courses.push(c);
                  });
                });

                console.log(courses);
                setCourses(courses);
              }}
            >
              Load
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                const { data, error } = await supabase
                  //@ts-ignore
                  .from("saves.gpa")
                  .delete()
                  .eq("id", save.id);

                if (error) {
                  console.error(error);
                } else {
                  setSaves(saves.filter((s) => s.id !== save.id));
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Save Name"
      />
      <Button
        onClick={async () => {
          const { data, error } = await supabase
            //@ts-ignore
            .from("saves.gpa")
            .insert({ userid: user?.id || "", name: name, data: gpa });

          if (error) {
            console.error(error);
          } else {
            console.log(data);
          }
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default Saves;
