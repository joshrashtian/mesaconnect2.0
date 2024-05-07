'use server'

import { Interest } from "../../../(tabs)/social/community/InterestButtons";
import { serverside } from "../../../../../../../config/serverside";

export async function submitInterests (interest: Interest) {
    const { data, error } = await serverside.from('interests').insert({
            interest: interest.interest,
            fieldType: interest.fieldType,
        
    }).select()

    if (error) {
        console.error(error);
    }

    return { data, error }

}