import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";

const PathwayLink = ({ link }: { link: string }) => {
  const router = useRouter();
  return (
    <DropdownMenuItem onClick={() => router.push(link)}>
      Edit Pathway
    </DropdownMenuItem>
  );
};

export default PathwayLink;
