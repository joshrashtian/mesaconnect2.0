"use server"

import { serverside } from "../../../../../../../config/serverside";
import { InfoBlockType } from "../[id]/infoblocks";

export async function editBlock(block: { id: string, data: any, visible: "public" | "private" | "friends"}): Promise<{ data: InfoBlockType | null, error: any }> {
    const { data, error } = await serverside.from("infoblocks").update(block).match({id: block.id, userid: (await serverside.auth.getUser()).data.user?.id});

    return { data, error };
}