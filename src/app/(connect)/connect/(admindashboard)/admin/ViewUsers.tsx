"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { UserData } from "@/_assets/types";
import { DataTable } from "./(tables)/posts/datatable";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/app/(connect)/InfoContext";
import { UserColums } from "./(tables)/posts/columns";
import { useModal } from "../../Modal";

const ViewUsers = () => {
  const [data, setData] = useState<UserData[]>([]);
  const toast = useToast();
  const modal = useModal();

  const UserColumns: ColumnDef<UserData>[] = [
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
      header: "Joined",
      accessorKey: "created_at",
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
      header: "XP Points",
      accessorKey: "xp",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Verified",
      accessorKey: "verified",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Menu</span>
                <MoreHorizontal className="cursor-pointer rounded-3xl hover:bg-zinc-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-fit w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(user.id);
                  toast.CreateSuccessToast("Copied user ID: " + user.id);
                }}
              >
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  modal.CreateDialogBox(
                    <div>
                      <h4 className="font-black">{user.real_name}</h4>
                      <h5>{user.username}</h5>
                      <p>{user.bio}</p>
                      <p>Major: {user.major}</p>
                      <p>College: {user.college}</p>
                      <p>Verified: {user.verified.valueOf()}</p>
                      <p>Joined on {new Date(user.created_at).toISOString()}</p>
                    </div>,
                    () => {},
                    {
                      confirmText: "Close",
                    },
                  );
                }}
              >
                In-Depth Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("profiles").select();

      if (error) {
        console.error(error);
        return;
      }

      // @ts-ignore
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="mb-32">
      <DataTable columns={UserColumns} data={data} />
    </div>
  );
};

export default ViewUsers;
