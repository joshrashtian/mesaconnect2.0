"use server"
import { CommunityItemType } from "@/(mesaui)/CommunityItem";
import { serverside } from "../../../../../../config/serverside";

export async function createCommunity(community: CommunityItemType) {
    const { data, error } = await serverside.rpc("create_community", {
        newid: community.id, 
        newname: community.name, 
        newdescription: community.description,
         newcampus: community.primary_campus,
          newprivate: community.private
    }
    )
    return { data, error }
}