"use client";

import { PostType, UserData } from "@/_assets/types";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
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
import { Pathway } from "../../PathwayBuilder";
import PathwayLink from "./PathwayLink";

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
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 cursor-pointer rounded-3xl p-0.5 hover:bg-zinc-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-fit w-48 font-eudoxus">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post.id)}
            >
              Copy Post ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `mesaconnect.io/connect/social/post/${post.id}`,
                )
              }
            >
              Copy Post URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post.userid)}
            >
              Copy User ID
            </DropdownMenuItem>
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
      const post = row.original;

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
              onClick={() => navigator.clipboard.writeText(post.id)}
            >
              Copy Post ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `mesaconnect.io/connect/social/post/${post.id}`,
                )
              }
            >
              Copy Post ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText("")}>
              Copy User ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const ClassesColumns: ColumnDef<ClassType>[] = [
  {
    header: "Class Number",
    accessorKey: "num",
  },
  {
    header: "Class Category",
    accessorKey: "category",
  },
  {
    header: "Class Name",
    accessorKey: "name",
  },
  {
    header: "Units",
    accessorKey: "units",
  },
  {
    header: "Description",
    accessorKey: "about",
  },
];

export const PathwayColumns: ColumnDef<Pathway>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Taggable",
    accessorKey: "tag",
  },
  {
    header: "College",
    accessorKey: "college",
  },
  {
    header: "University",
    accessorKey: "university",
  },
  {
    header: "Major",
    accessorKey: "major",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

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
            <PathwayLink link={`/connect/admin/pathway/${post.id}`} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
