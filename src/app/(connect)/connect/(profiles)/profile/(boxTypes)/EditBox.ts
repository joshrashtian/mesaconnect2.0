"use server"

import { serverside } from "../../../../../../../config/serverside";
import { BlockType } from "./types";

export async function editBlock(block: { id: string, data: any, visible: "public" | "private" | "friends"}): Promise<{ data: BlockType | null, error: any }> {
    const { data, error } = await serverside.from("infoblocks").update(block).match({id: block.id, userid: (await serverside.auth.getUser()).data.user?.id});

    return { data, error };
}

export async function deleteBlock(id: string): Promise<{ data: BlockType | null, error: any }> {
    const { data, error } = await serverside.from("infoblocks").delete().match({id, userid: (await serverside.auth.getUser()).data.user?.id});

    return { data, error };
}