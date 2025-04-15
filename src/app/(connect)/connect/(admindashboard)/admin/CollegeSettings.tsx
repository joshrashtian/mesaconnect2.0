import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { Editor } from "@monaco-editor/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb } from "lucide-react";
import { IoMdImage } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const importantFiles = [
  {
    name: "image.png",
    usage: "Background Image used in the landing page.",
  },
];
const CollegeSettings = () => {
  const { userData } = useUser();
  const [college, setCollege] = useState<any>(null);
  const [changes, setChanges] = useState<any>(null);
  const [bucket, setBucket] = useState<any>(null);

  useEffect(() => {
    async function getCollege() {
      const { data, error } = await supabase
        .from("colleges")
        .select("*")
        //@ts-ignore
        .eq("id", userData?.college)
        .single();

      const { data: collegeData, error: collegeError } = await supabase.storage
        .from("college")
        .list(`${data?.id}`);

      if (error || collegeError) {
        console.log(error, collegeError);
      }

      setCollege(data);
      setChanges(data);
      setBucket(collegeData);
    }
    getCollege();
  }, []);
  return (
    <div className="flex flex-col gap-4 pb-32">
      <h1 className="font-eudoxus text-3xl font-bold">College Settings</h1>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold">College Website URL</p>
        <Input
          className=""
          contentEditable={true}
          value={changes?.website}
          onChange={(e) => {
            setChanges({ ...changes, website: e.target.value });
          }}
        />
        <p className="text-sm font-bold">MESA URL for your College</p>
        <Input
          className=""
          contentEditable={true}
          value={changes?.mesa_website}
          onChange={(e) => {
            setChanges({ ...changes, mesa_website: e.target.value });
          }}
        />
        {changes !== college && <Button>Save</Button>}
      </div>
      <Tabs defaultValue="bucket" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="bucket" className="w-full">
            File Explorer
          </TabsTrigger>
          <TabsTrigger value="json" className="w-full">
            JSON Bucket
          </TabsTrigger>
          <TabsTrigger value="settings" className="w-full">
            JSON Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bucket">
          <ol className="flex flex-col gap-2 rounded-lg bg-zinc-50/60 p-5">
            {bucket?.map((item: any) => (
              <li
                key={item.id}
                className="flex flex-col rounded-lg bg-zinc-200/20 p-2 duration-300 hover:bg-zinc-200/40"
              >
                <p className="text-sm font-bold">
                  {item.name} - {new Date(item.updated_at).toLocaleString()}
                </p>

                <p className="flex items-center gap-2 text-sm">
                  {item.metadata.mimetype.includes("image") && (
                    <IoMdImage className="h-4 w-4" color="black" size={16} />
                  )}
                  {item.metadata.mimetype} -{" "}
                  {item.metadata.size > 1000000
                    ? `${(item.metadata.size / 1000000).toFixed(2)} MB`
                    : `${(item.metadata.size / 1000).toFixed(2)} KB`}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  {importantFiles.find((file) => file.name === item.name) && (
                    <>
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <p className="text-sm">
                        {
                          importantFiles.find((file) => file.name === item.name)
                            ?.usage
                        }
                      </p>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </TabsContent>
        <TabsContent value="json">
          <pre>{JSON.stringify(bucket, null, 2)}</pre>
        </TabsContent>
        <TabsContent value="settings">
          <p>
            Be careful editing your config, as it can break. Recommended only
            for viewing / detailed editing.
          </p>
          <Editor
            height="500px"
            defaultLanguage="json"
            className="rounded-lg"
            onChange={(value) => {
              setChanges(JSON.parse(value || "{}"));
            }}
            value={`${JSON.stringify(changes, null, 2)}`}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeSettings;
