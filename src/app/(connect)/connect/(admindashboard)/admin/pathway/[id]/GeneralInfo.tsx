"use client";
import React, { useState, useEffect } from "react";
import { Pathway } from "../../PathwayBuilder";
import { Button } from "@/components/ui/button";
import { supabase } from "../../../../../../../../config/mesa-config";
import { useToast } from "@/app/(connect)/InfoContext";
import { Reorder } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { IoClose } from "react-icons/io5";
const GeneralInfo = ({ pathway }: { pathway: Pathway }) => {
  const [colors, setColors] = useState<string[]>(["#FFF"]);
  const [newColor, setNewColor] = useState<string>("");
  const toast = useToast();
  useEffect(() => {
    setColors(pathway.colors);
  }, [pathway]);
  return (
    <div className="flex w-full flex-col gap-2">
      <ol className="flex flex-row gap-2">
        <h4 className="my-4 text-lg font-semibold text-zinc-700">
          Colors: {colors?.join(", ")}
        </h4>
      </ol>
      <Separator />

      <Reorder.Group axis="y" onReorder={setColors} values={colors}>
        {colors?.map((color, i) => (
          <Reorder.Item
            className="relative mt-1 flex w-full flex-row items-center gap-2 rounded-xl bg-zinc-200"
            value={color}
            key={color}
          >
            <ol
              className="h-16 w-16 rounded-xl"
              style={{ backgroundColor: color }}
            />
            <p className="text-lg font-semibold text-zinc-700"> {color}</p>
            <Button
              onClick={() => {
                setColors(colors.filter((c) => c !== color));
              }}
              className="absolute right-0 mr-3"
            >
              <IoClose />
            </Button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Separator />
      <input
        type="color"
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!newColor) return;
          if (!colors || colors.length === 0) {
            setColors([newColor]);
          } else {
            setColors([...colors, newColor]);
          }
          setNewColor("");
        }}
      >
        Add Color
      </Button>
      <Button
        onClick={async () => {
          const { data, error } = await supabase
            //@ts-ignore
            .from("pathway")
            //@ts-ignore
            .update({ colors })
            .eq("id", pathway.id);
          if (error) {
            toast.CreateErrorToast(error.message);
          } else {
            toast.CreateSuccessToast("Colors updated successfully");
          }
        }}
      >
        Submit Updates
      </Button>
    </div>
  );
};

export default GeneralInfo;
