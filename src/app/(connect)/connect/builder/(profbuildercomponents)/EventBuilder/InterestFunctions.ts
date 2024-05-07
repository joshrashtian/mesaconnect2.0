'use server'

import { Interest } from "../../../(tabs)/social/community/InterestButtons";
import { serverside } from "../../../../../../../config/serverside";

export async function submitInterests (interest: Interest) {
    let { data, error } = await serverside
  .rpc('addinterest', {
    newfieldtype: interest.interest, 
    newinterest: interest.fieldType, 
    newinterestid: interest.id ? interest.id : null 
  })

    if (error) {
        console.error(error);
    }

    return { data, error }

}