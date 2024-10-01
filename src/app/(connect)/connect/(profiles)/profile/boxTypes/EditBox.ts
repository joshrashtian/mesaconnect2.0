"use server"

import { serverside } from "../../../../../../../config/serverside";
import { InfoBlockType } from "../[id]/infoblocks";

async function editBlock(block: InfoBlockType) {
    const { data, error } = await serverside.from("infoblocks").update(block).match({id: block.id, userid: (await serverside.auth.getUser()).data.user?.id});

    return { data, error };
}