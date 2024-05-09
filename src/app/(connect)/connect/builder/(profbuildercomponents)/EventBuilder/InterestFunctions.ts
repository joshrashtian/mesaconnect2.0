'use server'

import { Interest } from "../../../(tabs)/social/community/InterestButtons";
import { serverside } from "../../../../../../../config/serverside";

export async function submitInterests (interest: Interest) {
    let { data, error } = await serverside
  .rpc('addinterest', {
    newfieldtype: interest.fieldtype, 
    newinterest: interest.interest, 
    newinterestid: interest.id ? interest.id : null 
  })

    if (error) {
        console.error(error);
    }

    return { data, error }

}

export async function deleteInterest (interest: Interest) {
    let { data, error } = await serverside.from("interests").delete().eq("id", interest.id);

    if (error) {
        console.error(error);
    }

    return { data, error };
}