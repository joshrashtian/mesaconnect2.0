"use client";

import { PostType, UserData } from "@/_assets/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<PostType>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Post ID",
    accessorKey: "id",
  },
  {
    header: "Creator ID",
    accessorKey: "userid",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Created At",
    accessorKey: "created_at",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 cursor-pointer rounded-3xl p-0.5 hover:bg-zinc-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-fit w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const UserColums: ColumnDef<UserData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "User ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "real_name",
  },
  {
    header: "Major",
    accessorKey: "major",
  },
  {
    header: "Campus",
    accessorKey: "college",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="cursor-pointer rounded-3xl hover:bg-zinc-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-fit w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
