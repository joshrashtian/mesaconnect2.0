import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const DisbandModal = ({ community }: { community: string | string[] }) => {
  const [input, setInput] = React.useState("");
  return (
    <div className="flex h-full flex-col justify-between gap-10">
      <header>
        <h4 className="font-bold">
          Are you sure you want to disband this community?{" "}
          <pre className="text-red-600">This action can not be undone.</pre>
        </h4>
      </header>

      <footer>
        <h5>Type the name of your community in order to disband it.</h5>
        <Input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button className={` ${input !== community && "bg-zinc-600"} `}>
          Confirm
        </Button>
      </footer>
    </div>
  );
};

export default DisbandModal;
